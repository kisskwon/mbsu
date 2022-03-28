package com.lge.mbsu.tvconnect;

import com.lge.mbsu.tvconnect.alarm.AlarmSetting;

import org.apache.cordova.*;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

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

    if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
      handleSendText(intent); // Handle text being sent
    }
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    Log.e("2MB", "SharingActivity onNewIntent");
    String action = intent.getAction();
    String type = intent.getType();
    if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
      handleSendText(intent); // Handle text being sent
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

}
