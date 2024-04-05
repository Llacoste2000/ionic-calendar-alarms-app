package io.ionic.starter;

import android.Manifest;
import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.provider.CalendarContract;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "Calendar", permissions = {
    @Permission(strings = { Manifest.permission.READ_CALENDAR }, alias = "calendar")
})
public class CalendarPlugin extends Plugin {
  @PluginMethod()
  public void getCalendarsList(PluginCall call) {
    Context context = getContext();
    ContentResolver contentResolver = context.getContentResolver();

    String[] projection = new String[] {
        CalendarContract.Calendars._ID,
        CalendarContract.Calendars.NAME,
        CalendarContract.Calendars.ACCOUNT_NAME,
        CalendarContract.Calendars.ACCOUNT_TYPE
    };

    Cursor cursor = contentResolver.query(CalendarContract.Calendars.CONTENT_URI, projection, null, null, null);

    List<JSObject> calendarList = new ArrayList<>();

    if (cursor != null && cursor.moveToFirst()) {
      do {
        long calendarId = cursor.getLong(cursor.getColumnIndex(CalendarContract.Calendars._ID));
        String calendarName = cursor.getString(cursor.getColumnIndex(CalendarContract.Calendars.NAME));
        String accountName = cursor.getString(cursor.getColumnIndex(CalendarContract.Calendars.ACCOUNT_NAME));
        String accountType = cursor.getString(cursor.getColumnIndex(CalendarContract.Calendars.ACCOUNT_TYPE));

        JSObject calendar = new JSObject();
        calendar.put("id", calendarId);
        calendar.put("name", calendarName);
        calendar.put("accountName", accountName);
        calendar.put("accountType", accountType);

        calendarList.add(calendar);
      } while (cursor.moveToNext());

      cursor.close();
    }

    JSObject result = new JSObject();
    result.put("calendars", new JSArray(calendarList));

    call.resolve(result);
  }

  @PluginMethod()
  public void getEvents(PluginCall call) {
    Context context = getContext();
    ContentResolver contentResolver = context.getContentResolver();

    String[] projection = new String[] {
        CalendarContract.Events._ID,
        CalendarContract.Events.TITLE,
        CalendarContract.Events.DESCRIPTION,
        CalendarContract.Events.DTSTART,
        CalendarContract.Events.DTEND,
        CalendarContract.Events.CALENDAR_ID,
        CalendarContract.Events.ORGANIZER
    };

    String selection = CalendarContract.Events.DTSTART + " >= ?";
    String[] selectionArgs = new String[] { String.valueOf(System.currentTimeMillis()) };

    Cursor cursor = contentResolver.query(CalendarContract.Events.CONTENT_URI, projection, selection, selectionArgs,
        null);

    List<JSObject> eventList = new ArrayList<>();

    if (cursor != null && cursor.moveToFirst()) {
      do {
        int idColumnIndex = cursor.getColumnIndex(CalendarContract.Events._ID);
        long eventId = idColumnIndex != -1 ? cursor.getLong(idColumnIndex) : null;

        int titleColumnIndex = cursor.getColumnIndex(CalendarContract.Events.TITLE);
        String title = titleColumnIndex != -1 ? cursor.getString(titleColumnIndex) : null;

        int descriptionColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DESCRIPTION);
        String description = descriptionColumnIndex != -1 ? cursor.getString(descriptionColumnIndex) : null;

        int dtStartColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DTSTART);
        long dtStart = dtStartColumnIndex != -1 ? cursor.getLong(dtStartColumnIndex) : null;

        int dtEndColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DTEND);
        long dtEnd = dtEndColumnIndex != -1 ? cursor.getLong(dtEndColumnIndex) : null;

        int calendarIdColumnIndex = cursor.getColumnIndex(CalendarContract.Events.CALENDAR_ID);
        long calendarId = calendarIdColumnIndex != -1 ? cursor.getLong(calendarIdColumnIndex) : null;

        int organizerColumnIndex = cursor.getColumnIndex(CalendarContract.Events.ORGANIZER);
        String organizer = organizerColumnIndex != -1 ? cursor.getString(organizerColumnIndex) : null;

        JSObject event = new JSObject();
        event.put("id", eventId);
        event.put("title", title);
        event.put("description", description);
        event.put("dtStart", dtStart);
        event.put("dtEnd", dtEnd);
        event.put("calendarId", calendarId);
        event.put("organizer", organizer);

        eventList.add(event);
      } while (cursor.moveToNext());

      cursor.close();
    }

    JSObject result = new JSObject();
    result.put("events", new JSArray(eventList));

    call.resolve(result);
  }
}
