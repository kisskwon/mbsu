package com.lge.mbsu.tvconnect;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.content.IntentFilter;
import android.widget.Toast;

public class SharingActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
      handleSendText(intent); // Handle text being sent
    }
  }

  void handleSendText(Intent intent) {
    String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
    if (sharedText != null) {
      Toast.makeText(this, sharedText, Toast.LENGTH_SHORT).show();  // 동작 수정 필요.
    }
  }
}
