---
title: "Chapter 1 — What is Cloud Computing?"
sidebar_position: 1
description: "By the end of this chapter, you will be able to: Explain what cloud computing is in simple words"
---

## 📖 Story First

Meet **Rahul**.

Rahul wants to start a small online business selling handmade notebooks. He has a great website idea and a small budget.

He has two choices.

---

### Choice 1 — The Old Way (Before Cloud)

Rahul goes and buys a physical computer server. It costs him ₹3,00,000. He sets it up in a room. He pays for electricity every month. He hires a technician to maintain it. If the server crashes at 2 AM, Rahul gets a phone call. If his website suddenly gets 10,000 visitors during a sale, his server cannot handle it and crashes.

In January, his website gets 100 visitors a day. The server is sitting there doing almost nothing. But Rahul still pays for it — the full cost.

In December, his website gets 50,000 visitors a day. The server was built for 100 visitors. It crashes. Rahul loses money.

He is paying for hardware he sometimes does not need, and still not having enough when he does need it. This is the old way.

---

### Choice 2 — The Cloud Way (Today)

Instead of buying a server, Rahul rents computing power from a company that already has millions of servers ready to use.

When his website has 100 visitors, he pays for exactly 100 visitors worth of power. When it jumps to 50,000 visitors, the system automatically gives him more power within seconds. When traffic drops back down, the extra power is released and he stops paying for it.

He pays only for what he uses. Like electricity at home. You do not buy a power plant. You just plug in and pay your monthly bill.

**That is cloud computing.**

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what cloud computing is in simple words
- ✅ Explain why cloud computing is better than on-premises servers
- ✅ Understand the three main cloud service models
- ✅ Explain what "pay as you go" means

---

## ☁️ The Actual Concept

**Cloud Computing** is the delivery of computing services over the internet.

These services include:

```
┌─────────────────────────────────────────────────────┐
│                 CLOUD SERVICES                      │
├─────────────────────────────────────────────────────┤
│  🖥️  Servers (Compute)                               │
│  💾  Storage                                        │
│  🗄️  Databases                                      │
│  🌐  Networking                                     │
│  🔒  Security                                       │
│  📊  Analytics                                      │
│  🤖  Artificial Intelligence                        │
└─────────────────────────────────────────────────────┘
```

Instead of buying and maintaining physical hardware, you rent these services from a cloud provider and access them over the internet.

---

## 📊 On-Premises vs Cloud — Side by Side

```
┌─────────────────────────┬─────────────────────────┐
│     ON-PREMISES         │        CLOUD            │
├─────────────────────────┼─────────────────────────┤
│ Buy hardware upfront    │ Rent, pay monthly       │
│ Takes weeks to set up   │ Ready in minutes        │
│ Fixed capacity          │ Scales up/down          │
│ You maintain it         │ Provider maintains it   │
│ Pay even if idle        │ Pay only what you use   │
│ One location            │ Global instantly        │
│ Hardware gets old       │ Always latest hardware  │
└─────────────────────────┴─────────────────────────┘
```

---

## 🏫 School Analogy

Think about school textbooks.

**Old way:** Every student buys their own copy of every book. Even if they never open half of them. Even if they share the same book, they each bought one.

**Cloud way:** The school library has all books. Students borrow what they need, when they need it, for as long as they need it. They return it when done. Nobody buys a book they do not need.

Cloud computing is the library model applied to technology.

---

## 📦 Three Types of Cloud Services

There are three ways you can use the cloud. Each gives you a different level of control.

```
┌─────────────────────────────────────────────────────────────┐
│                  CLOUD SERVICE MODELS                       │
├───────────────┬───────────────────┬─────────────────────────┤
│     IaaS      │       PaaS        │          SaaS           │
│Infrastructure │    Platform       │   Software as Service   │
│  as a Service │   as a Service    │                         │
├───────────────┼───────────────────┼─────────────────────────┤
│ You get raw   │ You get a ready   │ You get a ready         │
│ servers and   │ platform to build │ application to use      │
│ networks      │ your app on       │ directly                │
├───────────────┼───────────────────┼─────────────────────────┤
│ Example:      │ Example:          │ Example:                │
│ AWS EC2       │ AWS Elastic       │ Gmail, Zoom,            │
│               │ Beanstalk         │ Salesforce              │
├───────────────┼───────────────────┼─────────────────────────┤
│ School: You   │ School: You get   │ School: You just        │
│ get an empty  │ a classroom with  │ attend class. No        │
│ plot of land  │ chairs & boards   │ setup needed            │
└───────────────┴───────────────────┴─────────────────────────┘
```

---

## 💡 Key Terms to Remember

| Term | Meaning |
|------|---------|
| **Cloud Computing** | Using computing services over the internet |
| **On-Premises** | Hardware you own and manage yourself |
| **Pay As You Go** | You pay only for what you actually use |
| **Scalability** | Ability to increase or decrease resources easily |
| **IaaS** | You manage servers, provider manages hardware |
| **PaaS** | Provider manages servers, you manage application |
| **SaaS** | Provider manages everything, you just use it |

---

## ❓ Quick Quiz

**Question 1:** Rahul's website suddenly gets 100x more traffic. What happens in the cloud that cannot happen with a physical server?

```
A) The website crashes immediately
B) The cloud automatically adds more resources
C) Rahul has to buy more servers manually
D) Nothing changes
```

**Answer: B** — The cloud can automatically scale to handle more traffic.

---

**Question 2:** Which of these is the best real-world analogy for cloud computing?

```
A) Buying a car
B) Building a house
C) Using electricity from the power grid
D) Planting your own crops
```

**Answer: C** — You use what you need and pay for it. You do not build your own power plant.

---

## 🎤 Interview Questions

**Q: What is cloud computing in simple terms?**

> Cloud computing is the delivery of computing services like servers, storage, and databases over the internet, where you pay only for what you use instead of buying and maintaining your own hardware.

**Q: What is the difference between IaaS, PaaS, and SaaS?**

> IaaS gives you raw infrastructure like virtual machines. PaaS gives you a platform where you just deploy your code. SaaS gives you a ready-to-use application. As you go from IaaS to SaaS, you manage less and the provider manages more.

**Q: What does "pay as you go" mean in cloud?**

> It means you are charged only for the resources you actually consume, similar to how you pay for electricity. There is no upfront hardware cost. If you use a server for 2 hours, you pay for 2 hours only.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 1 SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Cloud = Using IT services over the internet         │
│  ✅ No need to buy or maintain physical hardware        │
│  ✅ Pay only for what you use                           │
│  ✅ Scale up or down as needed                          │
│  ✅ IaaS = Raw infrastructure                           │
│  ✅ PaaS = Ready platform for your app                  │
│  ✅ SaaS = Ready application to use directly            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
