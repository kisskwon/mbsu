package com.lge.mbsu.tvconnect.hooking;

import android.app.Notification;
import android.os.Bundle;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import com.lge.mbsu.tvconnect.hooking.HookEvent;

import org.greenrobot.eventbus.EventBus;


public class HubNotificationService extends NotificationListenerService {
    private static final String TAG = "HubNotificationService";

    @Override
    public void onCreate() {
        super.onCreate();
        Log.w(TAG, "NotificationService started.");
    }

    @Override
    public void onNotificationPosted(StatusBarNotification statusBarNotification) {
        String pack = statusBarNotification.getPackageName();
        Notification notification = statusBarNotification.getNotification();
        if (notification == null || pack == null || pack.isEmpty()) {
            Log.w(TAG, "Invalid notification.");
            return;
        }
        try {
            String ticker = notification.tickerText.toString();
            Bundle extras = notification.extras;
            String title = extras.getString("android.title");
            String text = extras.getCharSequence("android.text").toString();

            Log.i(TAG, "Package: " + pack);
            Log.i(TAG, "Ticker: " + ticker);
            Log.i(TAG, "Title: " + title);
            Log.i(TAG, "Text: " + text);
            if (pack.equals("com.kakao.talk")) {
                Bundle bundle = new Bundle();
                bundle.putString("package", pack);
                bundle.putString("from", title);
                bundle.putString("text", text);
                EventBus.getDefault().post(new HookEvent(bundle));
            }
        } catch (Throwable th) {
            Log.w(TAG, "Fail to get notification." + th);
        }
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        Log.i(TAG, "Notification Removed");
    }
}
