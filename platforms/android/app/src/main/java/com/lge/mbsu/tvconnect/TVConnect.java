package com.lge.mbsu.tvconnect;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.ComponentName;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.Toast;

/**
 * This class echoes a string called from JavaScript.
 */
public class TVConnect extends CordovaPlugin {
    public static final String PREFERENCES_NAME = "preference";
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.e("2MB", "TVConnect = execute" + args);
        if (action.equals("toast")) {
            String message = args.getString(0);
            this.showToast(message, callbackContext);
            return true;
        } else if (action.equals("turnOn")) {
            startCallUp(args, callbackContext);
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

    private void showToast(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            Toast.makeText(cordova.getContext(), message, Toast.LENGTH_SHORT).show();
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
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

    private void startCallUp(final JSONArray args, final CallbackContext callbackContext) {
        Log.e("2MB", "2MB startCallUp args " + args);

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
                Log.i("2MB", "2MB Exception thrown.");
                callbackContext.error("2MB fuck you.");
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
}