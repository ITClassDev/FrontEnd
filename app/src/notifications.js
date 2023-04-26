export const parseNotification = (notification) => {
    // Notifications mapping
    const ALL_NOTIFICATIONS = [
        {
            title: "Новое достижение!",
            base: "Ваше достижение {name} прошло модерацию! Начислено {points} баллов",
            color: "success",
        },
        {
            title: "Достижение отклонено",
            base: "Ваше достижение {name} отклонено",
            color: "error",
        },
        {
            title: "Новое мероприятие!",
            base: "Добавлено новое школьное мероприятие - {name}",
            color: "info",
        },
        {
            title: "Новая медаль!",
            base: "Вы получили новую медаль!",
            color: "success",
        },
        {
            title: "Уведомление",
            base: "{text}",
            color: "info"
        },
        {
            title: "Уведомление",
            base: "{text}",
            color: "warning"
        }
    ];

    return {
        title: ALL_NOTIFICATIONS[notification.type].title,
        description: ALL_NOTIFICATIONS[notification.type].base.replace(
            /{(\w+)}/g,
            (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
                notification.data[placeholderWithoutDelimiters] ||
                placeholderWithDelimiters
        ),
        color: ALL_NOTIFICATIONS[notification.type].color
    }


}