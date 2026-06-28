---
title: "Chapter 13 — AMI — Amazon Machine Images"
sidebar_position: 13
description: "By the end of this chapter, you will be able to: Explain what an AMI is and why it matters"
---


---

## 📖 Story First

The school has been running for a while now. Every new student who joins needs the same setup: a desk, a chair, textbooks, a locker combination, and school software installed on their assigned computer.

In the early days, the school IT team used to set up each new student's computer manually. Install the operating system. Install the learning software. Configure network settings. Set up the printer. It took about two hours per student.

Then one day, the IT team had a brilliant idea.

They took one perfectly configured computer — with all the software installed, all settings configured, everything working perfectly — and made a **master image** of it. A complete snapshot of the hard drive, operating system, applications, and settings.

Now, when a new student joins, they do not start from scratch. They simply copy this master image onto a new computer. The new computer turns on with everything already set up. It takes 10 minutes instead of 2 hours.

This master image is what AWS calls an **Amazon Machine Image (AMI)** .

An AMI is a pre-configured template that contains everything needed to launch an EC2 instance: the operating system, software packages, configuration settings, and even application code.

Just like the school can have different images for different types of students — "Standard Student," "Science Student," "Art Student" — AWS has different AMIs for different purposes.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what an AMI is and why it matters
- ✅ Understand the different types of AMIs available
- ✅ Choose the right AMI for your workload
- ✅ Create a custom AMI from an existing EC2 instance

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│              SCHOOL  ←→  AMI MAPPING                    │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Master computer image    │ Amazon Machine Image (AMI)   │
│ Pre-installed software   │ Pre-installed OS + apps      │
│ Windows lab image        │ Windows Server AMI           │
│ Linux lab image          │ Amazon Linux AMI             │
│ Custom Science lab image │ Custom AMI you create        │
│ School-supplied template │ AWS-provided AMI             │
│ Teacher-created image    │ Community AMI (shared)       │
│ Image for one school     │ AMI is region-specific       │
│   (not usable at another)│ (not available globally)     │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

An **Amazon Machine Image (AMI)** is a template that defines the software configuration of an EC2 instance. When you launch an EC2 instance, you must select an AMI. The AMI determines the operating system, the software installed, and the root volume configuration.

Think of an AMI like a recipe. You use the recipe to bake a cake (launch an instance). You can use the same recipe many times to bake identical cakes. Or you can modify the recipe and save it as a new recipe (create a custom AMI).

AMIs are **regional**. An AMI created in us-east-1 (N. Virginia) is NOT available in eu-west-1 (Ireland) by default. You must copy it across regions if needed. This is like a school's master image being locked in one building — you need to manually copy it to another building.

```
┌─────────────────────────────────────────────────────────┐
│                     AMI KEY FACTS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ AMI = Template for launching EC2 instances           │
│  ✅ Contains: OS + software + configuration             │
│  ✅ AMIs are REGIONAL — different IDs per region        │
│  ✅ You can create custom AMIs from running instances   │
│  ✅ AMIs can be shared across AWS accounts             │
│  ✅ 4 sources: AWS provided, AWS Marketplace,           │
│     Community, Custom (your own)                        │
│  ✅ AMI ID format: ami-0abcdef1234567890               │
│  ✅ Each AMI has a Root Volume Device mapped            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Types of AMIs

```
┌─────────────────────────────────────────────────────────────┐
│                     AMI SOURCES                             │
├──────────────────────┬──────────────────────────────────────┤
│   SOURCE             │  DESCRIPTION                         │
├──────────────────────┼──────────────────────────────────────┤
│ AWS Provided         │ Amazon Linux, Ubuntu, Windows,       │
│                      │ Red Hat, SUSE — maintained by AWS    │
│                      │ Free or paid (Windows license extra) │
├──────────────────────┼──────────────────────────────────────┤
│ AWS Marketplace      │ Third-party software pre-installed   │
│                      │ Example: WordPress AMI, Jenkins AMI │
│                      │ Often includes paid licensing        │
├──────────────────────┼──────────────────────────────────────┤
│ Community AMIs       │ Shared by other AWS users            │
│                      │ Free to use, no support              │
│                      │ Verify security before using         │
├──────────────────────┼──────────────────────────────────────┤
│ Custom AMI           │ Created by YOU from your instances   │
│                      │ Best for production consistency      │
│                      │ You control everything               │
└──────────────────────┴──────────────────────────────────────┘
```

---

## 🔄 AMIs Are Region-Specific — Important!

This concept matters for the exam and real-world usage:

```
REGION              AMI ID (Amazon Linux 2023 example)
───────────         ─────────────────────────────────────
us-east-1           ami-0abcdef1234567890
us-west-2           ami-1bcdef2345678901
eu-west-1           ami-2cdef3456789012
ap-southeast-1      ami-3def4567890123
```

The same AMI has ✅ **different IDs** in each region.

This is because each region is independent. AWS replicates the AMI across regions, but each copy gets its own unique ID.

> 💡 **Pro tip:** When copying a lab guide or tutorial, ALWAYS check that the AMI ID matches YOUR region. Using a us-east-1 AMI ID in eu-west-1 will fail.

---

## 🧪 Hands-On Lab — Create a Custom AMI

```
STEP 1: Launch a base EC2 instance (use Chapter 12 steps):
        AMI: Amazon Linux 2023 (Free Tier)
        Type: t2.micro
        Key Pair: MyKeyPair (or create new)
        Security Group: Allow SSH from your IP

STEP 2: Connect via SSH to the instance:
        ssh -i "MyKeyPair.pem" ec2-user@<public-ip>

STEP 3: Install custom software (example — a web server):
        sudo yum update -y
        sudo yum install -y httpd
        sudo systemctl enable httpd
        sudo systemctl start httpd
        echo "<h1>Hello from my AMI!</h1>" | sudo tee \
          /var/www/html/index.html

STEP 4: Verify the web server works:
        Open browser: http://<public-ip>
        You should see: "Hello from my AMI!"

STEP 5: Create the AMI:
        Go to EC2 Console → Instances
        Select your instance → Actions
        Image and templates → Create image
        Image name: MyWebServer-AMI-v1
        Image description: Amazon Linux with httpd installed
        Click "Create image"

STEP 6: Wait for the AMI to be created:
        Go to AMI section (EC2 Console → AMIs)
        Status: "pending" → "available" (takes 2-5 min)

STEP 7: Launch a NEW instance from your custom AMI:
        Click "Launch instance from this AMI"
        Select same instance type: t2.micro
        Same Security Group (HTTP + SSH)
        Launch it!

STEP 8: Connect to the new instance:
        ssh to its public IP
        The httpd service should already be installed!
        (It was baked into the AMI)
        Open browser: http://<new-instance-ip>
        You should see: "Hello from my AMI!"

✅ Your custom AMI works! Any instance launched from it
   will already have httpd installed and configured.

STEP 9: (Optional) Clean up:
        Terminate both instances
        Deregister the AMI if no longer needed:
        AMIs → Select → Actions → Deregister
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always create AMIs from stopped instances for data consistency. A running instance might have cached data or open files that are not flushed to disk. For zero-downtime environments, use AWS Backup instead.

> 💡 **Tip 2:** AMIs include attached EBS snapshots. Deleting the AMI does NOT automatically delete the underlying snapshots — you must delete those separately to avoid ongoing storage charges.

> 💡 **Tip 3:** Use Infrastructure as Code tools (Terraform, CloudFormation) to automate AMI creation with tools like Packer. This ensures your AMIs are built the same way every time, with no manual steps.

---

## ❓ Quick Quiz

**Question 1:** You create an AMI from an EC2 instance in us-east-1. Can you use this AMI directly in eu-west-1?

```
A) Yes, AMIs are global
B) No, AMIs are regional — you must copy it
C) Yes, but only if you use the same instance type
D) No, AMIs can never be used in another region
```
**Answer: B** — AMIs are regional. You must copy the AMI to eu-west-1 using the "Copy AMI" action before you can use it there.

---

**Question 2:** You have 50 EC2 instances that all need the same custom software installed. What is the BEST approach?

```
A) Install the software manually on each instance
B) Create an AMI with the software, then launch all 50 instances from it
C) Write a script and run it on each instance after launch
D) Use AWS Marketplace to find a public AMI
```
**Answer: B** — Creating a custom AMI ensures all 50 instances are identical, launch faster, and have zero manual configuration errors.

---

## 🎤 Interview Questions

**Q: What is an AMI and when would you create a custom one?**

> An AMI (Amazon Machine Image) is a template that contains the OS, software, and configuration needed to launch an EC2 instance. I would create a custom AMI when I need to launch multiple instances with identical software configurations — for example, in an auto-scaling group where new instances must have the same web server and application code. Custom AMIs ensure consistency, reduce launch times, and eliminate manual configuration errors.

**Q: What is the difference between an AMI and an EBS Snapshot?**

> An AMI is a complete template for launching an EC2 instance — it includes one or more EBS snapshots for the root volume, plus metadata like block device mappings and architecture. An EBS Snapshot is just a backup of a single EBS volume. An AMI can be thought of as a "launchable package" while a snapshot is simply a "backup file." You cannot launch an EC2 instance directly from a snapshot — you must first create a volume from it.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 13 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ AMI = Pre-configured template for EC2 instances     │
│  ✅ Like a master computer image at a school            │
│  ✅ AMIs are REGIONAL — different IDs per region        │
│  ✅ 4 sources: AWS, Marketplace, Community, Custom      │
│  ✅ Custom AMIs = your configured instance saved as     │
│     an image, reusable for future launches              │
│  ✅ Create AMIs from STOPPED instances for consistency  │
│  ✅ Deregistering an AMI does NOT remove snapshots      │
│  ✅ Custom AMIs are essential for auto-scaling groups   │
│  ✅ AMI ID format: ami-xxxxxxxxxxxxxxxxx               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
