function formatDateTime (date) {
    // const d = new Date(date);
    // let day;
    // switch(d.getDay()) {
    //     case 0:
    //         day = "Sun";
    //         break;
    //     case 1:
    //         day = "Mon";
    //         break;
    //     case 2:
    //         day = "Tue";
    //         break;
    //     case 3:
    //         day = "Wed";
    //         break;
    //     case 4:
    //         day = "Thu";
    //         break;
    //     case 5:
    //         day = "Fri";
    //         break;
    //     case 6:
    //         day = "Sat";
    //         break;
    //     default:
    //         console.error("Invalid day of the week.");
    // }

    // const mon = d.getMonth();
    // const dt = d.getDate();
    // const yr = d.getFullYear();
    // const time = d.toLocaleTimeString();

    console.log(date.toLocaleString("en-us", {
        localeMatcher: "best fit",
        weekday: undefined,
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }));
}

const now = new Date();
formatDateTime(now);