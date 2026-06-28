# CHAPTER 6
# CIDR & IP Addressing

---

## 📖 Story First

The school has a campus (VPC) and sections within it (Subnets). Now every student, teacher, and room in the school needs an address — so we can find them and communicate with them.

When a new student joins, the school assigns them a student ID number. This ID is unique. The administration can always find a student using their ID.

In your AWS network, every server, database, and resource also needs an address. This address is called an **IP address**.

But here is the challenge. You have potentially thousands of resources. How do you decide which addresses to use? How do you make sure you have enough? How do you divide them up between the different sections of your campus?

This is exactly what **CIDR (Classless Inter-Domain Routing)** helps you do.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Understand what an IP address is
- ✅ Read a CIDR block like 10.0.0.0/16
- ✅ Know how many IP addresses a CIDR block gives you
- ✅ Plan IP ranges for a VPC and its Subnets

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│           SCHOOL  ←→  CIDR/IP MAPPING                  │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ School campus            │ VPC (10.0.0.0/16)            │
│ Total student IDs given  │ Total IP addresses           │
│ to the campus            │ in the VPC CIDR              │
│                          │                             │
│ Science Wing IDs         │ Subnet CIDR (10.0.1.0/24)   │
│ 10001 to 10256           │                             │
│                          │                             │
│ Arts Wing IDs            │ Subnet CIDR (10.0.2.0/24)   │
│ 20001 to 20256           │                             │
│                          │                             │
│ Each student ID          │ Each IP address              │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ What is an IP Address?

An **IP Address** is a unique number assigned to every device on a network — like a home address.

It looks like this: **192.168.1.100**

Four numbers separated by dots. Each number is between 0 and 255.

```
  192  .  168  .   1   .  100
  ───────────────────────────
  This is your "home address" on the network
```

---

## ☁️ What is CIDR?

**CIDR** is a way to represent a RANGE of IP addresses using a single notation.

Instead of listing thousands of IP addresses one by one, CIDR lets you say:
*"I want all IP addresses from 10.0.0.0 to 10.0.255.255"* — in just 6 characters: **10.0.0.0/16**

The **slash number** (like /16 or /24) tells you how many IP addresses are in the range.

```
┌─────────────────────────────────────────────────────────┐
│              CIDR QUICK REFERENCE                       │
├──────────────────┬──────────────┬───────────────────────┤
│   CIDR Block     │  Usable IPs  │  Typical Use          │
├──────────────────┼──────────────┼───────────────────────┤
│  10.0.0.0/16     │   65,536     │  VPC (large)          │
│  10.0.0.0/24     │     256      │  Subnet               │
│  10.0.0.0/28     │      16      │  Very small subnet    │
└──────────────────┴──────────────┴───────────────────────┘

Rule: Smaller the slash number = More IP addresses
      /16 gives MORE IPs than /24
      /24 gives MORE IPs than /28
```

---

## 🔢 Understanding the Slash Number

The slash number is called the **prefix length**. Here is how to understand it:

```
10.0.0.0 / 16
           ↑
      This means 16 bits are FIXED (the network part)
      The remaining bits are FREE (for your devices)
      
Total bits in an IP address = 32
Fixed bits = 16
Free bits = 32 - 16 = 16
IP addresses = 2^16 = 65,536
```

Simple memory trick:

```
/16  →  Roughly 65,000 addresses  →  Use for VPC
/24  →  Roughly 256 addresses     →  Use for Subnets
/32  →  Exactly 1 address         →  Single device
```

---

## 🏫 The School ID System

Imagine the school assigns student IDs in this format:

```
Campus ID range:  10000 to 75535  (65,536 students total → /16)

Science Wing:     10001 to 10256  (256 students → /24)
Arts Wing:        10257 to 10512  (256 students → /24)
Admin Block:      10513 to 10528  (16 staff → /28)
```

Each section gets a subset of the total campus IDs. No section uses the same IDs. Every person has a unique ID.

**This is exactly how VPC and Subnet CIDRs work.**

Your VPC gets a big range (like /16).
Each Subnet gets a smaller slice of that range (like /24).

---

## 📐 Planning Your IP Ranges

```
┌─────────────────────────────────────────────────────────────┐
│              IP PLANNING EXAMPLE                            │
│                                                             │
│  VPC:              10.0.0.0/16   (65,536 IPs)              │
│                                                             │
│  Public  Subnet-1: 10.0.1.0/24  (256 IPs) in AZ-1         │
│  Private Subnet-1: 10.0.2.0/24  (256 IPs) in AZ-1         │
│                                                             │
│  Public  Subnet-2: 10.0.3.0/24  (256 IPs) in AZ-2         │
│  Private Subnet-2: 10.0.4.0/24  (256 IPs) in AZ-2         │
│                                                             │
│  Public  Subnet-3: 10.0.5.0/24  (256 IPs) in AZ-3         │
│  Private Subnet-3: 10.0.6.0/24  (256 IPs) in AZ-3         │
│                                                             │
│  RULE: Subnet CIDRs must not overlap!                      │
│  RULE: Subnet CIDRs must be within VPC CIDR range          │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ AWS Reserved IPs in Every Subnet

One important fact: AWS reserves **5 IP addresses** in every Subnet for its own use.

```
In a /24 subnet (256 IPs), you actually get 251 usable IPs.
The 5 reserved are:

  10.0.1.0   → Network address
  10.0.1.1   → AWS VPC Router
  10.0.1.2   → AWS DNS Server
  10.0.1.3   → Future use (reserved by AWS)
  10.0.1.255 → Broadcast address
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always use private IP ranges for VPCs. The standard private IP ranges are: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. In practice, 10.0.0.0/16 is the most popular choice.

> 💡 **Tip 2:** Plan your IP ranges before you start. Once you create a VPC, you cannot easily change the CIDR. Think ahead about how many subnets and resources you will need.

> 💡 **Tip 3:** Leave gaps between subnet ranges. Do not use 10.0.1.0/24, 10.0.2.0/24 one after another. Skip a few ranges. This gives you room to expand later.

---

## ❓ Quick Quiz

**Question 1:** How many IP addresses does a /24 subnet give you?

```
A) 16
B) 65,536
C) 256
D) 1024
```
**Answer: C** — /24 gives 256 addresses (251 usable after AWS reserves 5).

---

**Question 2:** Which CIDR block gives you MORE IP addresses?

```
A) 10.0.0.0/28
B) 10.0.0.0/24
C) 10.0.0.0/16
D) 10.0.0.0/32
```
**Answer: C** — Smaller slash number = more IP addresses.

---

## 🎤 Interview Questions

**Q: What is a CIDR block and why is it used in AWS?**

> CIDR (Classless Inter-Domain Routing) is a method of representing a range of IP addresses. In AWS, you use CIDR blocks to define the IP address range for your VPC and each Subnet. For example, 10.0.0.0/16 gives you 65,536 IP addresses for your entire VPC, and you split that into smaller /24 blocks for each subnet.

**Q: What does the /24 in 10.0.1.0/24 mean?**

> The /24 means that 24 bits of the address are fixed as the network portion, leaving 8 bits free for hosts. Since 2 to the power of 8 is 256, a /24 gives you 256 IP addresses. After AWS reserves 5 for internal use, you have 251 usable IP addresses in that subnet.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 6 SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ IP Address = Unique address for every resource      │
│  ✅ CIDR = A range of IP addresses in one notation      │
│  ✅ /16 = ~65,000 addresses (for VPC)                   │
│  ✅ /24 = ~256 addresses (for Subnets)                  │
│  ✅ Smaller slash = MORE addresses                      │
│  ✅ AWS reserves 5 IPs in every Subnet                  │
│  ✅ Subnet CIDRs must fit inside VPC CIDR               │
│  ✅ Subnet CIDRs must not overlap each other            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
