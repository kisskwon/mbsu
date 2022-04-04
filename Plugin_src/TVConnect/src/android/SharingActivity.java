package com.lge.mbsu.tvconnect;

import com.lge.mbsu.tvconnect.alarm.AlarmSetting;

import org.apache.cordova.*;

import android.content.ContentResolver;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class SharingActivity extends CordovaActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    // enable Cordova apps to be started in the background
    Bundle extras = getIntent().getExtras();
    if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
        moveTaskToBack(true);
    }

    // Set by <content src="index.html" /> in config.xml
    Log.e("2MB", "SharingActivity onCreate launchUrl :" + launchUrl);
    loadUrl(launchUrl);

    // if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
    //   handleSendText(intent); // Handle text being sent
    // }
    handleIntent(intent);
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    Log.e("2MB", "SharingActivity onNewIntent");
    String action = intent.getAction();
    String type = intent.getType();
    // if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
    //   handleSendText(intent); // Handle text being sent
    // }
    handleIntent(intent);
  }

    void handleIntent(Intent intent) {
        String action = intent.getAction();
        String type = intent.getType();
        Log.d("2MB", "handleIntent action: " + action + ", type: " + type);

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendText(intent); // Handle text being sent
            } else if (type.startsWith("image/")) {
                handleSendImage(intent); // Handle single image being sent
            }
        } else if (Intent.ACTION_SEND_MULTIPLE.equals(action) && type != null) {
            if (type.startsWith("image/")) {
                handleSendMultipleImages(intent); // Handle multiple images being sent
            }
        }
    }

    void handleSendText(Intent intent) {
        String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (appView != null && appView.isInitialized() && sharedText != null) {
            appView.getPluginManager().postMessage("setCDVInterface", AlarmSetting.getInstance(this));
            Log.e("2MB", "go add reminder");
            Toast.makeText(this, sharedText, Toast.LENGTH_SHORT).show();

            int mode = 0; //mode normal
            if (sharedText.contains("netflix")) {
                mode = 1; //mode netflix
            }
            AlarmSetting.getInstance(this).gotoAddReminder(mode, sharedText);
        }
    }

    void handleSendImage(Intent intent) {
        Uri imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
        if (imageUri != null) {
            // Update UI to reflect image being shared
            Log.d("2MB", "imageUri: " + imageUri);
            String base64Image = getBase64(imageUri);
            new Handler(Looper.getMainLooper()).postDelayed((Runnable) () -> appView.getPluginManager().postMessage("onSelectImages", base64Image), 2000);
        }
    }

    public String getBase64(Uri uri) {
        ContentResolver resolver = getApplicationContext().getContentResolver();
        byte[] resBytes = null;
        try (InputStream stream = resolver.openInputStream(uri)) {
            // Perform operations on "stream".
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();

            int nRead;
            byte[] data = new byte[16384];
            while ((nRead = stream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            buffer.flush();
            resBytes = buffer.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Base64.encodeToString(resBytes, 1);
    }

    void handleSendMultipleImages(Intent intent) {
        ArrayList<Uri> imageUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
        if (imageUris != null) {
            // Update UI to reflect multiple images being shared
            for (int i = 0; i < imageUris.size(); i++) {
                Log.d("2MB", "imageUri[" + i + "]: " + imageUris.get(i));
            }
        }
    }

}
