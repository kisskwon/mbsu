package com.lge.mbsu.tvconnect;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.widget.Toast;

/**
 * This class echoes a string called from JavaScript.
 */
public class TVConnect extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("toast")) {
            String message = args.getString(0);
            this.showToast(message, callbackContext);
            return true;
        } else if (action.equals("turnOn")) {
            startCallUp(args, callbackContext);
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
}
