---
title: "Chapter 12 — EC2 — Elastic Compute Cloud"
sidebar_position: 12
description: "By the end of this chapter, you will be able to: Explain what an EC2 instance is"
---


---

## 📖 Story First

The school is fully set up. The campus is ready (VPC). The sections are defined (Subnets). The directions are in place (Route Tables). The main gate is installed (Internet Gateway). The security guards are positioned (Security Groups and NACLs).

Now it is time to add the most important thing.

**The students.**

In a school, students are the reason everything else exists. They are the ones who actually do the work — attending classes, writing exams, conducting experiments.

In AWS, the equivalent of students — the resources that actually do the computing work — are called **EC2 Instances**.

An EC2 instance is simply a **virtual computer** running in the cloud. You can use it to host a website, run a program, process data, or do anything you would do with a regular computer.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what an EC2 instance is
- ✅ Choose the right EC2 instance type
- ✅ Launch an EC2 instance
- ✅ Connect to an EC2 instance via SSH
- ✅ Understand EC2 pricing models

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│            SCHOOL  ←→  EC2 MAPPING                     │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Student                  │ EC2 Instance                 │
│ Student's capabilities   │ Instance type (size)         │
│ (smart, athletic, etc.)  │ (t3.micro, m5.large, etc.)  │
│ Classroom where student  │ Subnet where instance runs   │
│ sits                     │                             │
│ Student ID card          │ Instance ID                  │
│ Student rules (allowed   │ Security Group               │
│ in which rooms)          │                             │
│ Student's locker         │ EBS Volume (storage)         │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ EC2 Instance Types

Not all students are the same. Some are great at Math. Some are athletic. Some do both. Similarly, EC2 instances come in different types optimized for different workloads.

```
┌─────────────────────────────────────────────────────────────┐
│                  EC2 INSTANCE TYPE FAMILIES                 │
├───────────────┬──────────────────────────────────────────── ┤
│   FAMILY      │  OPTIMIZED FOR        │  EXAMPLE USE        │
├───────────────┼───────────────────────┼─────────────────────┤
│  General      │ Balanced CPU, RAM,    │ Web servers,        │
│  Purpose      │ Network               │ small databases     │
│  (t3, m6)     │                       │                     │
├───────────────┼───────────────────────┼─────────────────────┤
│  Compute      │ High CPU performance  │ Video encoding,     │
│  Optimized    │                       │ batch processing    │
│  (c6, c7)     │                       │                     │
├───────────────┼───────────────────────┼─────────────────────┤
│  Memory       │ Large amounts of RAM  │ Large databases,    │
│  Optimized    │                       │ in-memory caching   │
│  (r6, x2)     │                       │                     │
├───────────────┼───────────────────────┼─────────────────────┤
│  Storage      │ High disk I/O speed   │ Data warehouses,    │
│  Optimized    │                       │ distributed FS      │
│  (i3, d3)     │                       │                     │
├───────────────┼───────────────────────┼─────────────────────┤
│  GPU          │ Graphic processing    │ Machine learning,   │
│  (p4, g5)     │                       │ 3D rendering        │
└───────────────┴───────────────────────┴─────────────────────┘
```

### Reading Instance Names

```
   t  3  .  micro
   │  │     │
   │  │     └── Size (nano/micro/small/medium/large/xlarge)
   │  └──────── Generation (higher = newer)
   └──────────── Family (t=general/burstable, m=general, 
                         c=compute, r=memory, i=storage)
```

---

## 💰 EC2 Pricing Models

```
┌─────────────────────────────────────────────────────────────┐
│                   EC2 PRICING OPTIONS                       │
├────────────────┬────────────────────────────────────────────┤
│  PRICING TYPE  │  DESCRIPTION                               │
├────────────────┼────────────────────────────────────────────┤
│ On-Demand      │ Pay by the hour or second                  │
│                │ No commitment, most flexible               │
│                │ School: Daily visitor pass                 │
├────────────────┼────────────────────────────────────────────┤
│ Reserved       │ Commit to 1 or 3 years upfront            │
│                │ Up to 72% cheaper than On-Demand          │
│                │ School: Annual student enrollment fee      │
├────────────────┼────────────────────────────────────────────┤
│ Spot           │ Use spare AWS capacity at up to 90% off   │
│                │ AWS can terminate with 2 min notice        │
│                │ School: Standby student with no           │
│                │ guaranteed seat                           │
├────────────────┼────────────────────────────────────────────┤
│ Savings Plans  │ Flexible commitment to $ amount/hour      │
│                │ Up to 66% savings                         │
│                │ School: Flexible discount for regulars    │
└────────────────┴────────────────────────────────────────────┘
```

---

## 🧪 Hands-On Lab — Launch Your First EC2 Instance

```
STEP 1: Go to EC2 Console → Click "Launch Instance"

STEP 2: Name your instance:
        Name: MyFirstServer

STEP 3: Choose Amazon Machine Image (AMI):
        Select: Amazon Linux 2023 (Free Tier eligible)

STEP 4: Choose Instance Type:
        Select: t2.micro (Free Tier eligible)

STEP 5: Create a Key Pair (for SSH access):
        Click "Create new key pair"
        Name: MyKeyPair
        Type: RSA
        Format: .pem (for Linux/Mac) or .ppk (for Windows)
        Click "Create key pair"
        ⚠️ SAVE THIS FILE SAFELY — you cannot download again!

STEP 6: Network Settings:
        VPC: MyFirstVPC
        Subnet: PublicSubnet-1
        Auto-assign public IP: Enable
        Security Group: Select WebServer-SG (from Ch.10)

STEP 7: Storage:
        Leave default (8 GB gp3)

STEP 8: Click "Launch Instance"

STEP 9: Connect to your instance:
        Select instance → Click "Connect"
        Choose "SSH Client" tab
        Copy the SSH command shown
        Run it in your terminal:
        
        ssh -i "MyKeyPair.pem" ec2-user@<your-public-ip>

✅ You are now connected to your virtual server in AWS!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always use t2.micro or t3.micro for practice — these are Free Tier eligible. Using larger instances will incur charges.

> 💡 **Tip 2:** Stop your EC2 instance when not using it. A stopped instance does not incur compute charges (though the EBS storage still costs). Always stop instances when done practicing.

> 💡 **Tip 3:** NEVER share your .pem key file. This is your password to the server. Store it securely and never commit it to GitHub.

---

## ❓ Quick Quiz

**Question 1:** You need to run a database server that requires 512 GB of RAM. Which instance family should you choose?

```
A) Compute Optimized (c6)
B) Memory Optimized (r6)
C) General Purpose (t3)
D) Storage Optimized (i3)
```
**Answer: B** — Memory Optimized instances are designed for workloads requiring large amounts of RAM.

---

**Question 2:** Which pricing model should you use for a development server that only runs Monday to Friday, 9am to 6pm?

```
A) Reserved (1 year commitment)
B) On-Demand (pay as you go)
C) Spot (cheapest but can be terminated)
D) Savings Plans
```
**Answer: B** — On-Demand is best when you stop the server regularly and do not need it full-time.

---

## 🎤 Interview Questions

**Q: What is EC2 and what are its main pricing models?**

> EC2 (Elastic Compute Cloud) is AWS's virtual server service. It allows you to launch and manage virtual machines in the cloud. The main pricing models are: On-Demand where you pay by the hour with no commitment, Reserved where you commit to 1 or 3 years for up to 72% savings, Spot where you use spare AWS capacity at up to 90% discount but can be interrupted, and Savings Plans which offer flexible discounts based on a spending commitment.

**Q: What factors do you consider when choosing an EC2 instance type?**

> I consider the nature of the workload — whether it is CPU-intensive (Compute Optimized), memory-intensive (Memory Optimized), balanced (General Purpose), or requires fast disk I/O (Storage Optimized). I also consider the required vCPUs and RAM, expected network throughput, and cost. For initial deployments I often start with General Purpose and resize based on actual performance metrics.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 12 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ EC2 = Virtual server in AWS cloud                   │
│  ✅ Like a student in the school — does the actual work │
│  ✅ Instance types match workload needs                 │
│     (t=general, c=compute, r=memory, i=storage)        │
│  ✅ 4 pricing models: On-Demand, Reserved, Spot, Savings│
│  ✅ For practice: always use t2.micro (Free Tier)       │
│  ✅ Stop instances when not using them                  │
│  ✅ Key Pair = Password file to SSH into server         │
│  ✅ Never share .pem files or commit to GitHub          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
