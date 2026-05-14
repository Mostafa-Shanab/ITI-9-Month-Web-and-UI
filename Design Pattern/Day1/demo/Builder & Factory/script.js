class NotificationType{
    send(email){}
}

class EmailNotification extends NotificationType{
    send(email){
        console.log(`Sending email to ${email}`);
    }
}

class SMSNotification extends NotificationType{
    send(email){
        console.log(`Sending sms to ${email}`);
    }
}

class PushNotification extends NotificationType{
    send(email){
        console.log(`Sending push notification to ${email}`);
    }
}


class NotificationFactory{
    static create(type){
        switch(type){
            case "email":
                return new EmailNotification();
            case "sms":
                return new SMSNotification();
            case "push":
                return new PushNotification();
            default:
                throw new Error("Invalid notification type");
        }
    }
}

class Notification{
    constructor(){
        this.userId = "";
        this.title = "";
        this.message = "";
        this.type = "email";
        this.priority = "normal";
        this.attachments = [];
        this.scheduleTime = null;
        this.retryCount = 3;
        this.tracking = true;
    }


    // sendNotification(){
    //     if(this.type === "email"){
    //         new EmailNotification().send(this.userId);
    //     }else if(this.type === "sms"){
    //         new SMSNotification().send(this.userId);
    //     }else if(this.type === "push"){
    //         new PushNotification().send(this.userId);
    //     }
    // }

    sendNotification(){
        const notf = NotificationFactory.create(this.type);
        notf.send(this.message);
    }


}

class NotificationBuilder{
    constructor(){
        this.notification = new Notification(); //composition
    }

    to(userId){
        this.notification.userId = userId;
        return this;  //builder obj
    }


    title(text){
        this.notification.title = text;
        return this;
    }
    message(text){
        this.notification.message = text;
        return this;
    }
    type(notificationType){
        this.notification.type = notificationType;
        return this;
    }
    attach(file){
        this.notification.attachments.push(file);
        return this;
    }
    priority(value){
        this.notification.priority = value;
        return this;
    }
    scheduleTime(date){
        this.notification.scheduleTime = date;
        return this;
    }

    build(){
        return this.notification;
    }
}


// let notification1 = new Notification()
const notification = new NotificationBuilder().to("user123").title("Welcome!").message("Thank you for signing up.").type("sms").priority("high").attach("welcome.pdf").scheduleTime(new Date()).build();
console.log(notification);

notification.sendNotification();