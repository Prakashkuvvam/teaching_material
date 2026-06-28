---
title: "Chapter 7 — Route Tables"
sidebar_position: 7
description: "By the end of this chapter, you will be able to: Explain what a Route Table is"
---


---

## 📖 Story First

The school campus now has clearly divided sections — Science Wing, Arts Wing, Administrative Block, and so on.

But here is a problem.

When a student walks out of their classroom, how do they know which direction to go? How does a visitor from outside find their way to the Principal's office? How does the canteen staff know which path to take to deliver food to each section?

The school has **signboards and direction maps** placed at key points.

*"To reach the Science Lab → Turn Left"*
*"To exit the campus → Go straight ahead to the main gate"*
*"The Administrative Block is only accessible by staff → Staff Entrance Only"*

These signboards tell everyone **where to go** when they want to reach a destination.

In AWS, these signboards are called **Route Tables**.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what a Route Table is
- ✅ Understand what a Route entry means
- ✅ Know the difference between main and custom Route Tables
- ✅ Associate a Route Table with a Subnet

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│           SCHOOL  ←→  ROUTE TABLE MAPPING              │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Campus direction map     │ Route Table                  │
│ Signboard/direction rule │ Route entry (row in table)   │
│ Destination on signboard │ Destination CIDR             │
│ Arrow showing direction  │ Target (where to send it)    │
│ Public entrance signboard│ Route Table for Public Subnet│
│ Internal staff map       │ Route Table for Private Subnet│
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

A **Route Table** is a set of rules (called routes) that determine where network traffic is directed.

Every Subnet in your VPC must be associated with a Route Table. The Route Table tells the network: *"If you want to reach this destination, go through this path."*

```
┌────────────────────────────────────────────────────────┐
│              EXAMPLE ROUTE TABLE                       │
│            (For Public Subnet)                         │
├──────────────────────┬─────────────────────────────────┤
│    DESTINATION       │        TARGET                   │
├──────────────────────┼─────────────────────────────────┤
│  10.0.0.0/16         │  local                          │
│  (traffic going to   │  (stay within the VPC)          │
│   any IP in the VPC) │                                 │
├──────────────────────┼─────────────────────────────────┤
│  0.0.0.0/0           │  igw-xxxxxxxx                   │
│  (ALL other traffic  │  (Send to Internet Gateway)     │
│   including internet)│                                 │
└──────────────────────┴─────────────────────────────────┘

Reading this table:
→ "If you want to reach 10.0.0.0/16 (inside the VPC), 
   stay local"
→ "If you want to reach anything else 
   (like google.com), go through the Internet Gateway"
```

---

## 📋 Route Table Types

```
┌─────────────────────────────────────────────────────────┐
│                  ROUTE TABLE TYPES                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  MAIN ROUTE TABLE                                       │
│  • Automatically created with your VPC                 │
│  • Applied to subnets that have no explicit RT          │
│  • Usually kept as private (no internet route)         │
│                                                         │
│  CUSTOM ROUTE TABLE                                     │
│  • You create this for specific subnets                │
│  • Example: Public RT with internet gateway route      │
│  • Can be associated with multiple subnets             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🗺️ Public vs Private Route Table

```
┌───────────────────────────────────────────────────────────┐
│                       YOUR VPC                            │
│                                                           │
│  PUBLIC ROUTE TABLE              PRIVATE ROUTE TABLE      │
│  ┌─────────────────────┐        ┌────────────────────┐   │
│  │ Destination │ Target│        │Destination │ Target│   │
│  ├─────────────┼───────┤        ├────────────┼───────┤   │
│  │ 10.0.0.0/16 │ local │        │10.0.0.0/16 │ local │   │
│  │ 0.0.0.0/0   │ IGW   │        │ (no 0.0.0.0│ route)│   │
│  └─────────────┴───────┘        └────────────┴───────┘   │
│           │                              │                │
│           ▼                              ▼                │
│  ┌─────────────────┐          ┌──────────────────────┐   │
│  │  PUBLIC SUBNET  │          │   PRIVATE SUBNET      │   │
│  │  Web Servers    │          │   Database Servers    │   │
│  └─────────────────┘          └──────────────────────┘   │
└───────────────────────────────────────────────────────────┘
```

The Public Subnet has a route to the Internet Gateway (IGW), which is why it can access the internet.

The Private Subnet does NOT have a route to the IGW, which is why it cannot directly access the internet.

---

## 🧪 Hands-On Lab — Create a Public Route Table

```
STEP 1: Go to VPC Console → Route Tables
        Click "Create Route Table"

STEP 2: Name: PublicRouteTable
        VPC: MyFirstVPC
        Click "Create"

STEP 3: Select your new Route Table
        Click "Routes" tab
        Click "Edit routes"
        Click "Add route"
        
STEP 4: Add Internet Route:
        Destination: 0.0.0.0/0
        Target: Select "Internet Gateway"
                Select your Internet Gateway (igw-xxxxx)
        Click "Save changes"

STEP 5: Associate with Public Subnet
        Click "Subnet associations" tab
        Click "Edit subnet associations"
        Select: PublicSubnet-1
        Click "Save"

✅ Your Public Subnet now has a route to the internet!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** The route 0.0.0.0/0 means "any destination not matched by other routes." It is called the default route. Adding this pointing to an Internet Gateway is what makes a subnet public.

> 💡 **Tip 2:** Always keep the Main Route Table as your Private Route Table with no internet route. Create separate custom Route Tables for public access.

> 💡 **Tip 3:** One Route Table can be associated with multiple subnets. But one Subnet can only be associated with ONE Route Table at a time.

---

## ❓ Quick Quiz

**Question 1:** What does the route 0.0.0.0/0 → Internet Gateway mean?

```
A) Block all internet traffic
B) Send all unmatched traffic to the Internet Gateway
C) Restrict traffic to the VPC only
D) Delete all routes
```
**Answer: B**

---

**Question 2:** What makes a Subnet "public"?

```
A) It has a big CIDR range
B) It is in a public Availability Zone
C) Its Route Table has a route to an Internet Gateway
D) It has more than 100 servers
```
**Answer: C**

---

## 🎤 Interview Questions

**Q: What is a Route Table in AWS?**

> A Route Table is a set of rules that determines how network traffic is directed within a VPC. Each rule (route) specifies a destination IP range and a target — which is the gateway or network interface that traffic should be sent to. Every subnet must be associated with a route table.

**Q: How do you make a subnet public using Route Tables?**

> You create a custom route table and add a route with destination 0.0.0.0/0 pointing to an Internet Gateway. Then you associate this route table with the subnet. This tells the network to send all non-local traffic to the Internet Gateway, making the subnet publicly accessible.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 7 SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Route Table = Set of rules for directing traffic    │
│  ✅ Like signboards/directions inside a campus          │
│  ✅ Every Subnet must have a Route Table                │
│  ✅ Route has: Destination + Target                     │
│  ✅ local route = traffic within the VPC                │
│  ✅ 0.0.0.0/0 = All other traffic (internet)           │
│  ✅ Public Subnet RT → has route to Internet Gateway    │
│  ✅ Private Subnet RT → no internet route               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
