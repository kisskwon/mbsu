package com.lge.mbsu;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import java.util.Calendar;

public class AlarmSetting {
    public static final String PREFERENCES_NAME = "preference";
    private static AlarmSetting instance;
    private AlarmManager mAlarmManager;
    private Intent mAlarmIntent;
    private PendingIntent mPendingIntent;
    private Context mContext;
    private AlarmSetting(Context context) {
        mContext = context;
        mAlarmManager = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
        mAlarmIntent = new Intent(context, AlarmReceiver.class);
        mPendingIntent = PendingIntent.getBroadcast(context, 1111, mAlarmIntent, PendingIntent.FLAG_UPDATE_CURRENT);
    }

    public static AlarmSetting getInstance(Context context) {
        if (instance == null) {
            instance = new AlarmSetting(context);
        }
        return instance;
    }

    private SharedPreferences getPreferences(Context context) {
        return context.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
    }

    private int getInt(Context context, String key) {
        SharedPreferences prefs = getPreferences(context);
        int value = prefs.getInt(key, -1);
        return value;
    }

    private int getHour() {
        return getInt(mContext, "hour");
    }

    private int getMin() {
        return getInt(mContext, "min");
    }

    private int getAfter() {
        return getInt(mContext, "afterEnd");
    }

    public void setAlarm() {
        if (mAlarmManager == null || mPendingIntent == null) {
            return;
        }

        Calendar calendar = Calendar.getInstance();

        int hourTime = getHour() == -1 ? calendar.get(Calendar.HOUR_OF_DAY) : getHour();
        int minuteTime = getMin() == -1 ? calendar.get(Calendar.MINUTE) + 1 : getMin();

        calendar.set(Calendar.HOUR_OF_DAY, hourTime);
        calendar.set(Calendar.MINUTE, minuteTime);
        calendar.set(Calendar.SECOND, 0);

        long currentTime = System.currentTimeMillis();
        long triggerTime = calendar.getTimeInMillis();

        long interval = 1000 * 60 * 60 * 24;

        if(currentTime > triggerTime) {
            triggerTime += interval;
        }

        Log.e("2MB", "hour : " + hourTime + " min :" + minuteTime);
        Log.e("2MB", "currentTime : " + currentTime + " triggerTime :" + triggerTime + " interval : " + interval);

        //mAlarmManager.setInexactRepeating(AlarmManager.RTC_WAKEUP, triggerTime, interval, mPendingIntent);

        AlarmManager.AlarmClockInfo info = new AlarmManager.AlarmClockInfo(triggerTime, null);
        mAlarmManager.setAlarmClock(info, mPendingIntent);
    }
}
