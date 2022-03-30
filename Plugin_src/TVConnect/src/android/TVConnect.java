package com.lge.mbsu.tvconnect;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.ComponentName;
import android.content.Intent;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.util.Log;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.webkit.ValueCallback;
import android.widget.Toast;

/**
 * This class echoes a string called from JavaScript.
 */
public class TVConnect extends CordovaPlugin {
    public static final String PREFERENCES_NAME = "preference";
    private ICDVInterface sInterface;

    private static final int MODE_WEB = 0;
    private static final int MODE_NETFLIX = 1;

    private static final int CONNECT_TV = 0;
    private static final int LAUNCH_WEBAPP = 1;
    private static final int GOTO = 2;
    private static final int ON_NOTI_HOOKING = 3;
    private Handler mHandler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
            case CONNECT_TV:
                Log.e("2MB", "TVConnect CONNECT_TV");
                webView.loadUrl("javascript:tvconnect()");

                //Give 5 seconds to press a button on the TV... (first time)
                mHandler.removeMessages(LAUNCH_WEBAPP);
                mHandler.sendEmptyMessageDelayed(LAUNCH_WEBAPP, 5000);
                break;
            case LAUNCH_WEBAPP:
                Log.e("2MB", "TVConnect LAUNCH_WEBAPP");
                webView.loadUrl("javascript:launchWebApp()");
                break;
            case GOTO:
                int mode = msg.arg1;
                String url = (String)msg.obj;
                url = url.replaceAll("\"", "");
                Log.e("2MB", "TVConnect goto reminder mode : " + mode + " url :" + url);
                webView.loadUrl("javascript:gotoAddReminder(" + mode  + ", \"" + url + "\")");
                break;
            case ON_NOTI_HOOKING:
                Bundle bundle = (Bundle) msg.obj;
                String from = bundle.getString("from", "");
                String text = bundle.getString("text", "");
                Log.d("2MB", from + " " + text);
                webView.loadUrl("javascript:onReceiveHooking(\"" + from + "\", \"" + text + "\")");
                break;
            default:
                break;
            }
        }
    };

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.e("2MB", "TVConnect = execute" + args);
        if (action.equals("toast")) {
            String message = args.getString(0);
            this.showToast(message, callbackContext);
            return true;
        } else if (action.equals("turnOn")) {
            startTurnOnTV(args, callbackContext);
            return true;
        } else if (action.equals("startThinqGallery")) {
            startThinqGallery(args, callbackContext);
            return true;
        } else if (action.equals("setTime")) {
            setAlarmTime(args, callbackContext);
            return true;
        }
        return false;
    }

    @Override
    public Object onMessage(String id, Object data) {
        Log.e("2MB", "onMessage id : " + id);
        if (id.equals("setCDVInterface")) {
            Log.e("2MB", "setCDVInterface");
            sInterface = (ICDVInterface) data;
            sInterface.registerCDVInstance(this);
            return Boolean.TRUE;
        } else if (id.equals("onNotiHooking")) {
            mHandler.sendMessage(mHandler.obtainMessage(ON_NOTI_HOOKING, data));
            return true;
        }

        return super.onMessage(id, data);
    }


    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        Log.e("2MB", "initialize CordovaPlugin");
        super.initialize(cordova, webView);
        if (sInterface != null) {
            Log.e("2MB", "initialize setCDVInterface");
            sInterface.registerCDVInstance(this);
        }
    }

    private void showToast(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            Toast.makeText(cordova.getContext(), message, Toast.LENGTH_SHORT).show();
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }

        syncUpLocalStorageItem("ipAddr");
        syncUpLocalStorageItem("macAddr");
    }

    public static final int PORT = 9;
    private byte[] getMacBytes(String macStr) throws IllegalArgumentException {
        byte[] bytes = new byte[6];
        String[] hex = macStr.split("(\\:|\\-)");
        if (hex.length != 6) {
            throw new IllegalArgumentException("Invalid MAC address.");
        }
        try {
            for (int i = 0; i < 6; i++) {
                bytes[i] = (byte) Integer.parseInt(hex[i], 16);
            }
        }
        catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid hex digit in MAC address.");
        }
        return bytes;
    }

    private void startTurnOnTV() {
        Log.e("2MB", "2MB startTurnOnTV from native ");

        try {
            String macStr = getPrefString("macAddr");
            String ipStr = getPrefString("ipAddr");

            Log.e("2MB", "2MB startTurnOnTV from native macStr : " + macStr + " ip : " + ipStr);

            if (TextUtils.isEmpty(macStr) || TextUtils.isEmpty(ipStr)) {
                Toast.makeText(getApplicationContext(), "startTurnOnTV but ip,mac is empty...", Toast.LENGTH_LONG).show();
                return;
            }

            String [] ips = ipStr.split("\\.");
            ips[ips.length - 1] = "255";
            ipStr = String.join(".", ips);
            Log.e("2MB", "2MB startTurnOnTV from native new ip : " + ipStr);

            byte[] macBytes = getMacBytes(macStr);
            byte[] bytes = new byte[6 + 16 * macBytes.length];

            for (int i = 0; i < 6; i++) {
                bytes[i] = (byte) 0xff;
            }
            for (int i = 6; i < bytes.length; i += macBytes.length) {
                System.arraycopy(macBytes, 0, bytes, i, macBytes.length);
            }

            final String newip = ipStr;

            new Thread() {
                public void run() {
                   try {
                    InetAddress address = InetAddress.getByName(newip);
                    DatagramPacket packet = new DatagramPacket(bytes, bytes.length, address, PORT);
                    DatagramSocket socket = new DatagramSocket();
                    socket.send(packet);
                    socket.close();
                   } catch (Exception e) {
                    Log.i("2MB", "2MB Exception thrown1. " + e);
                   }
                }
             }.start();


            Log.i("2MB", "2MB Wake-on-LAN packet sent.");
        } catch(Exception e){
            Log.i("2MB", "2MB Exception thrown2. " + e);
        }
        return;
    }

    private void startTurnOnTV(final JSONArray args, final CallbackContext callbackContext) {
        Log.e("2MB", "2MB startTurnOnTV args " + args);

            try {
                String macStr = args.getString(0);
                String ipStr = args.getString(1);

                byte[] macBytes = getMacBytes(macStr);
                byte[] bytes = new byte[6 + 16 * macBytes.length];

                for (int i = 0; i < 6; i++) {
                    bytes[i] = (byte) 0xff;
                }
                for (int i = 6; i < bytes.length; i += macBytes.length) {
                    System.arraycopy(macBytes, 0, bytes, i, macBytes.length);
                }

                InetAddress address = InetAddress.getByName(ipStr);
                DatagramPacket packet = new DatagramPacket(bytes, bytes.length, address, PORT);
                DatagramSocket socket = new DatagramSocket();
                socket.send(packet);
                socket.close();

                Log.i("2MB", "2MB Wake-on-LAN packet sent.");
                callbackContext.success("2MB Wake-on-LAN packet sent.");
            } catch(Exception e){
                Log.i("2MB", "2MB Exception thrown." + e);
                callbackContext.error("2MB startTurnOnTV error.");
            }
        return;
    }

    private void startThinqGallery(final JSONArray args, final CallbackContext callbackContext) {
        Log.e("2MB", "2MB startThinqGallery args " + args);

        try {
            Intent launchIntent = cordova.getContext().getPackageManager().getLaunchIntentForPackage("com.example.damda_gallery");
            cordova.getContext().startActivity( launchIntent );

            Log.i("2MB", "2MB Wake-on-LAN packet sent.");
            callbackContext.success("2MB startThinqGallery packet sent.");
        } catch(Exception e){
            Log.i("2MB", "2MB Exception thrown.");
            callbackContext.error("2MB error");
        }
    }

    /*
    arg0 : hour
    arg1 : min
    arg2 : Day of the week (Json)
    arg3 : holiday
    arg4 : after End
    */
    private void setAlarmTime(final JSONArray args, final CallbackContext callbackContext) {
        Log.e("2MB", "2MB setAlarmTime args " + args);

        try {
            SharedPreferences prefs = getApplicationContext().getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putInt("hour", args.getInt(0));
            editor.putInt("min", args.getInt(1));

            JSONObject json = args.getJSONObject(2);
            editor.putString("dayofweek", json.toString());
            editor.putBoolean("holiday", args.getBoolean(3));
            editor.putInt("afterEnd", args.getInt(4));
            editor.commit();

            callbackContext.success("2MB save hour :" + args.getInt(0) + " min :" + args.getInt(1) + " dayofweek : " + json.toString());
            callbackContext.success("2MB save holiday :" + args.getBoolean(3) + " afterEnd :" + args.getInt(4));
            callbackContext.error("2MB setTime success");

            Intent intent = new Intent("com.lge.mbsu.SET_ALRAM");
            ComponentName component = new ComponentName("com.lge.mbsu", "com.lge.mbsu.AlarmReceiver");
            intent.setComponent(component);
            cordova.getContext().sendBroadcast(intent);
        } catch(Exception e) {
            Log.i("2MB", "2MB setAlarmTime Exception thrown.");
            callbackContext.error("2MB error");
        }
    }

    private Context getApplicationContext() {
        return this.cordova.getActivity().getApplicationContext();
    }

    private SharedPreferences getPreferences(Context context) {
        return context.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
    }

    private String getPrefString(String key) {
        SharedPreferences prefs = getPreferences(getApplicationContext());
        String value = prefs.getString(key, "");
        return value;
    }

    private void syncUpLocalStorageItem(String key) {
        String script = "(function() { \n" +
                    "var value = localStorage.getItem('" + key +"');\n" +
                    ("console.log('[native] localStorage(" + key + ") = ' + value);\n") +
                    "return value;\n" +
                "})();";
        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                if (webView != null && webView.getEngine() != null) {
                    webView.getEngine().evaluateJavascript(script, new ValueCallback<String>() {
                        @Override
                        public void onReceiveValue(String value) {
                            Log.e("2MB", "onReceiveValue : " + value);
                            SharedPreferences prefs = getApplicationContext().getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = prefs.edit();

                            value = value.replace("\"", "");
                            editor.putString(key, value);
                            editor.commit();
                        }
                    });
                }
            }
        });

    }

    public void pluginTurnOnTV() {
        Log.e("2MB", "TVConnect pluginTurnOnTV");
        startTurnOnTV();
        mHandler.removeMessages(CONNECT_TV);
        mHandler.sendEmptyMessageDelayed(CONNECT_TV, 5000);
    }

    public void gotoAddReminder(int mode, String url) {
        Log.e("2MB", "TVConnect gotoAddReminder");
        mHandler.removeMessages(GOTO);
        mHandler.sendMessageDelayed(mHandler.obtainMessage(GOTO, mode, 0, url), 500);
    }
}
