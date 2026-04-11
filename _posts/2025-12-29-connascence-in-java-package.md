---
title: "Assessing Coupling in a Java Package using Connascence"
date: 2025-12-29
categories: [system design]
tag: [connascence, coupling,cohesion, java, system design]
---

# Connascence

`Connascence` was first introduced by `Meilir Page-Jones` in his book titled **What every programmer should know about Object-Oriented Design**.
<div style="text-align: center;">
<figure>
    <img src="/assets/img/connascence.jpeg"
         alt="Albuquerque, New Mexico" width="200" height="100">
</figure>
</div>
We can apply `Connascence` to assess the strength of interrelationships that exists in our `Java` program starting with individual lines of code,method declaration and reference,objects and classes.`Connascence` is not a silver bullet to address design issues leading to accidental coupling in a software system, it is a critical tool to design a modular software system. 

As mentioned in [Connascene.io](https://connascence.io/) it gives us a rich vocabulary to talk about different levels of `coupling` that can exists in **Object Oriented Programming**.

# Types of Connascence

`Meilir Page-Jones` categorizes `connascence` into two categories 

1. `Static Connascence` -- Compile Time
2. `Dynamic Connascence` -- Run Time

# Identifying the Connascence

## Connascence of Name (CoN)

Below code snippet highlights CoN - If `sayHello()` method declaration in **line(5)** has to change,then **line(3)** invocation of the method has to be changed. This is a typical `Connascence Of Name (CoN)` where the individual lines of code are coupled by method name.

```java
public class Connascence{
        public static void main(String args[]){
            sayHello();
        }
        public static sayHello(){
              System.out.println("Hello");
        }
}
```
## Connascence of Type (CoT)

Below code snippet highlights CoT - If `sayHello()` method declaration in **line(5)** has to change,then **line(3)** invocation of the method has to be changed. This is a typical `Connascence Of Name (CoN)` where the individual lines of code are coupled by method name.

```java
public class Connascence{
        public static void main(String args[]){
            sayHello();
            SMS sms = new SMS();
            sendNotification(sms);
        }
        public static sayHello(){
              System.out.println("Hello");
        }
        public static sendNotification(SMS sms){
              System.out.println("Sending Notifications to " +
                sms.getMobileNumber()
              );
        }
}

public class SMS{
        public final String mobileNumber;
        public final String smsMessage;
        //Constructors,Getters
}
```




