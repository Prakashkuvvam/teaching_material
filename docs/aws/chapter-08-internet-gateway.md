---
title: "Chapter 8 — Internet Gateway"
sidebar_position: 8
description: "By the end of this chapter, you will be able to: Explain what an Internet Gateway is"
---

## 📖 Story First

The school campus has walls around it. The sections inside are organized. The signboards (Route Tables) tell everyone where to go.

But there is still one thing missing.

The campus has no **main gate**.

Students cannot enter from outside. Parents cannot come in. Deliveries cannot arrive. Letters cannot be sent out. Nobody from outside can come in, and nobody from inside can go out.

For the campus to connect with the rest of the world — the city, other schools, the internet — it needs a **main gate**.

This main gate is open to the public. It has a security check. Traffic flows in both directions — people can enter and exit through it.

In AWS, this main gate is called an **Internet Gateway**.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what an Internet Gateway is
- ✅ Understand how it enables internet access
- ✅ Know how to attach an IGW to a VPC
- ✅ Understand the complete flow of traffic from the internet to your server

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│        SCHOOL  ←→  INTERNET GATEWAY MAPPING            │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Main Gate of the campus  │ Internet Gateway             │
│ Gate connects campus to  │ IGW connects VPC to          │
│ the city                 │ the internet                 │
│ People enter/exit here   │ Traffic goes in and out here │
│ Gate has security check  │ AWS manages security at IGW  │
│ Only public sections     │ Only Public Subnets can use  │
│ are reachable from gate  │ the Internet Gateway         │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

An **Internet Gateway (IGW)** is an AWS-managed component that allows communication between your VPC and the internet.

Key facts:

```
┌─────────────────────────────────────────────────────────┐
│               INTERNET GATEWAY FACTS                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  • Attached to a VPC (not a Subnet)                    │
│  • One IGW per VPC                                     │
│  • Horizontally scaled — no bandwidth limit            │
│  • Highly available by default                         │
│  • Free to create (you pay for data transfer)          │
│  • Enables both INBOUND and OUTBOUND internet traffic  │
│  • Only works for resources with PUBLIC IP addresses   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🌐 Complete Traffic Flow

Let us trace exactly what happens when someone in the world opens your website hosted on AWS.

```
USER IN LONDON types: www.myschool.com
        │
        ▼
    INTERNET
        │
        ▼
┌───────────────────────────────────────────────────────┐
│                       VPC                             │
│                                                       │
│  ┌─────────────────┐                                 │
│  │ INTERNET GATEWAY│  ← Traffic arrives here first   │
│  └────────┬────────┘                                 │
│           │                                           │
│           ▼  Route Table says: 0.0.0.0/0 → IGW      │
│  ┌─────────────────────┐                             │
│  │    PUBLIC SUBNET    │                             │
│  │   ┌─────────────┐   │                             │
│  │   │  Web Server │   │  ← Request reaches here    │
│  │   │  (EC2)      │   │                             │
│  │   └─────────────┘   │                             │
│  └─────────────────────┘                             │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 🔒 Public IP Address is Required

For a resource to use the Internet Gateway, it needs a **Public IP address**.

Think of it this way:

A letter (traffic from the internet) needs a delivery address on the envelope. If your server only has a private IP address (like 10.0.1.50), the internet does not know how to reach it. It needs a public IP address — one that is unique and accessible on the internet.

```
PRIVATE IP: 10.0.1.50  →  Only works INSIDE the VPC
PUBLIC IP:  54.23.11.200 →  Works on the INTERNET
```

When a server in a Public Subnet receives a public IP, internet users can reach it directly through the Internet Gateway.

---

## 🧪 Hands-On Lab — Create and Attach Internet Gateway

```
STEP 1: Go to VPC Console → Internet Gateways
        Click "Create internet gateway"

STEP 2: Name: MyInternetGateway
        Click "Create internet gateway"

STEP 3: Attach to VPC
        Select your IGW
        Click "Actions" → "Attach to VPC"
        Select: MyFirstVPC
        Click "Attach internet gateway"

STEP 4: Verify Route Table
        Go to Route Tables
        Select PublicRouteTable
        Confirm it has route: 0.0.0.0/0 → your IGW

✅ Your VPC is now connected to the internet!
   Any resource with a Public IP in the Public Subnet
   can now communicate with the internet.
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** You can only attach ONE Internet Gateway to a VPC. If you need more internet connectivity, use multiple VPCs.

> 💡 **Tip 2:** An Internet Gateway alone is not enough. You also need a Route Table entry pointing to it AND the resource needs a Public IP address. All three components must work together.

> 💡 **Tip 3:** The Internet Gateway is highly available by default. You do not need to worry about it going down — AWS manages it for you.

---

## ❓ Quick Quiz

**Question 1:** How many Internet Gateways can you attach to a VPC?

```
A) Unlimited
B) One per Availability Zone
C) Exactly one
D) Two for High Availability
```
**Answer: C** — One IGW per VPC.

---

**Question 2:** A server in a Private Subnet wants to access the internet directly. Can it do so using an Internet Gateway?

```
A) Yes, through the Internet Gateway
B) No, Private Subnets cannot use the Internet Gateway
   directly
C) Yes, but only for outgoing traffic
D) Yes, if we give it a public IP
```
**Answer: B** — Private Subnets need a NAT Gateway for outbound internet access. Direct Internet Gateway access is only for Public Subnets.

---

## 🎤 Interview Questions

**Q: What is an Internet Gateway and what does it do?**

> An Internet Gateway is a VPC component that enables communication between resources in your VPC and the internet. It allows inbound traffic from the internet to reach resources with public IP addresses in public subnets, and it allows resources to send traffic out to the internet. It is attached at the VPC level and is highly available and scalable by default.

**Q: What are the three things needed for a server to be accessible from the internet?**

> First, the server must be in a Public Subnet. Second, the server must have a Public IP address. Third, the VPC must have an Internet Gateway attached, and the subnet's Route Table must have a route pointing 0.0.0.0/0 to that Internet Gateway.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 8 SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ IGW = The main gate connecting VPC to internet      │
│  ✅ One IGW per VPC                                     │
│  ✅ For internet access, you need:                      │
│       1. Internet Gateway attached to VPC               │
│       2. Route 0.0.0.0/0 → IGW in Route Table          │
│       3. Public IP on your resource                     │
│  ✅ Highly available — AWS manages it                   │
│  ✅ Free to create, pay only for data transfer          │
│  ✅ Private Subnets CANNOT use IGW directly             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
