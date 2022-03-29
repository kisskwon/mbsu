package com.lge.mbsu.tvconnect.alarm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class AlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if("android.intent.action.BOOT_COMPLETED".equals(intent.getAction()) ||"com.lge.mbsu.SET_ALRAM".equals(intent.getAction())) {
            Log.e("2MB", "onReceive action : " + intent.getAction());
            AlarmSetting alarmSetting = AlarmSetting.getInstance(context);
            alarmSetting.setAlarm();
        } else {
            Log.e("2MB", "AlarmReceiver action : " + intent.getAction());
            Toast.makeText(context, "alarm start...", Toast.LENGTH_LONG).show();
            AlarmSetting.getInstance(context).turnOnTv();
        }
    }
}