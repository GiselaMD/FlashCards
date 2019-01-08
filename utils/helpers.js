import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

const NOTIFICATION_KEY = 'notification:flashcards';

function createNotification() {
    return {
        title: 'Flashcards App',
        body: "Don't forget to answer your questions today!",
        ios: {
            sound: true
        },
        android: {
            sound: true
        },
    };
}

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (!data) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                            let today = new Date();
                            today.setDate(today.getDate());
                            today.setHours(20);
                            today.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(), 
                                {
                                time: today,
                                repeat: 'day',
                                }
                            )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                })
            }
        })
}