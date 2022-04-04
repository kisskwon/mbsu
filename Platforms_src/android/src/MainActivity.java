/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.lge.mbsu;

import com.lge.mbsu.tvconnect.alarm.AlarmSetting;

import android.os.Bundle;
import org.apache.cordova.*;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationManagerCompat;

import com.lge.mbsu.tvconnect.hooking.HookEvent;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;
import java.util.Set;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

        // share sheet
        Intent intent = getIntent();
        useHooker();
        requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},0);
        handleIntent(intent);
    }

    void handleIntent(Intent intent) {
        String action = intent.getAction();
        String type = intent.getType();

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
        Uri imageUri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
        if (imageUri != null) {
            // Update UI to reflect image being shared
            Log.d("kks", "imageUri: " + imageUri);
            Log.d("kks", "imageUri: " + getPath(imageUri));
        }
    }

    public String getPath(Uri uri){ //
        // String [] proj = {MediaStore.Images.Media.DATA};
        // CursorLoader cursorLoader = new CursorLoader(this, uri, proj, null, null, null);

        // Cursor cursor = cursorLoader.loadInBackground();
        // int index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        // cursor.moveToFirst();
        // return cursor.getString(index);
        // Open a specific media item using InputStream.
        ContentResolver resolver = getApplicationContext().getContentResolver();
        try (InputStream stream = resolver.openInputStream(uri)) {
            // Perform operations on "stream".
        }
    }

    void handleSendMultipleImages(Intent intent) {
        ArrayList<Uri> imageUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
        if (imageUris != null) {
            // Update UI to reflect multiple images being shared
            for (int i=0; i<imageUris.size(); i++) {
                Log.d("kks", "imageUri["+i+"]: " + imageUris.get(i));
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (EventBus.getDefault().isRegistered(this)) {
            EventBus.getDefault().unregister(this);
        }
    }

    private void useHooker() {
        if (!EventBus.getDefault().isRegistered(this)) {
            EventBus.getDefault().register(this);
        }
        if (!isNotificationPermissionAllowed()) {
            startActivity(new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS"));
        }
    }

    private boolean isNotificationPermissionAllowed() {
        Set<String> packages = NotificationManagerCompat.getEnabledListenerPackages(getApplicationContext());
        for (String pack : packages) {
            if (pack.equalsIgnoreCase(getPackageName())) {
                return true;
            }
        }
        return false;
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onMessageEvent(HookEvent event) {
        appView.getPluginManager().postMessage("onNotiHooking", event.info);
    }
}
