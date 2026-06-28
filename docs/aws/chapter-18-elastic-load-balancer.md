---
title: "Chapter 18 — Elastic Load Balancer (ELB)"
sidebar_position: 18
description: "By the end of this chapter, you will be able to: Explain what an Elastic Load Balancer (ELB) is and why it is needed"
---

## 📖 Story First

Imagine a large school with a single front desk receptionist.

Every morning, hundreds of students, parents, and visitors show up at the main entrance. They all crowd around the single receptionist. The line grows long. People get frustrated. Some wait 20 minutes just to get directions to a classroom. The receptionist is overwhelmed, and the whole system slows to a crawl.

Now imagine the school invests in a **smart reception system**.

Instead of one receptionist, the school installs a digital kiosk at the entrance. The kiosk automatically scans every visitor and directs them to the right place. If one building has too many visitors, the kiosk sends the next person to a different building that has fewer visitors. If one reception desk stops working, the kiosk automatically redirects traffic to the working desks.

Every visitor is distributed evenly. Nobody waits too long. No single receptionist gets overwhelmed. And if a reception desk goes down, the school keeps running smoothly.

This is exactly what an **Elastic Load Balancer** does in AWS.

Your web application may have multiple EC2 instances running behind the scenes. The Load Balancer sits in front of them and distributes incoming traffic evenly across all healthy instances. If one instance fails, the Load Balancer automatically sends traffic only to the healthy ones. If traffic increases, you add more instances, and the Load Balancer starts sending traffic to them automatically.

Now here is the most important detail: the visitors have no idea this is happening. From the outside, they just see one single entry point — one address they connect to. Internally, the Load Balancer is doing all the distribution work behind the scenes.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what an Elastic Load Balancer (ELB) is and why it is needed
- ✅ Differentiate between ALB, NLB, and CLB types
- ✅ Understand health checks, listeners, and target groups
- ✅ Configure cross-zone load balancing

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│      SCHOOL  ←→  ELASTIC LOAD BALANCER MAPPING         │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Main school reception    │ Load Balancer                │
│ desk                     │                             │
│ Kiosk rules              │ Listener rules               │
│ (who goes where)         │ (protocol + port mapping)    │
│ Different wings/buildings│ Target Group (EC2 instances) │
│ Receptionist checking if │ Health Check                 │
│ a room is open           │ (periodic status check)      │
│ Sending visitor to       │ Routing traffic to           │
│ least crowded building   │ healthiest instance          │
│ Main school phone number │ DNS name of Load Balancer    │
│ Building A closed today  │ Health check failing →       │
│ — redirect to Building B │ instance removed from pool   │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

An **Elastic Load Balancer (ELB)** is an AWS service that automatically distributes incoming application or network traffic across multiple targets — such as EC2 instances, containers, or Lambda functions — in multiple Availability Zones.

There are three types of Load Balancers in AWS:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ELASTIC LOAD BALANCER TYPES                            │
├──────────┬─────────────────┬──────────────────────┬────────────────────────┤
│ FEATURE  │   ALB           │   NLB                │   CLB (Classic)        │
│          │ (Application)   │ (Network)            │ (Legacy)               │
├──────────┼─────────────────┼──────────────────────┼────────────────────────┤
│ Layer    │ Layer 7         │ Layer 4              │ Layer 4 & 7            │
│          │ (HTTP/HTTPS)    │ (TCP/UDP)            │ (basic)                │
├──────────┼─────────────────┼──────────────────────┼────────────────────────┤
│ Protocol │ HTTP, HTTPS,    │ TCP, UDP, TLS        │ TCP, HTTP, HTTPS       │
│          │ gRPC            │                      │                        │
├──────────┼─────────────────┼──────────────────────┼────────────────────────┤
│ Routing  │ Path-based,     │ Low-latency,         │ Basic round-robin      │
│          │ host-based,     │ high-performance     │                        │
│          │ query-string    │                      │                        │
├──────────┼─────────────────┼──────────────────────┼────────────────────────┤
│ Use Case │ Web apps, APIs, │ Gaming, real-time    │ Legacy applications    │
│          │ microservices   │ streaming, IoT       │ (not recommended)      │
├──────────┼─────────────────┼──────────────────────┼────────────────────────┤
│ Current  │ ✅ Recommended  │ ✅ Recommended       │ ❌ Deprecated          │
└──────────┴─────────────────┴──────────────────────┴────────────────────────┘
```

### Key Components

A Load Balancer has several key parts:

- **Listener**: Defines which port and protocol the Load Balancer listens on (e.g., HTTP on port 80, HTTPS on port 443).
- **Target Group**: A logical group of EC2 instances (or other targets) that receive traffic. The Load Balancer forwards traffic to the target group.
- **Health Check**: The Load Balancer periodically checks if each target is healthy by sending a ping to a specific endpoint (e.g., `/health`). If the target fails the health check, it is removed from the rotation.

```
┌─────────────────────────────────────────────────────────┐
│                 KEY FACTS TABLE                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ ELB distributes traffic across multiple instances    │
│  ✅ 3 types: ALB (Layer 7), NLB (Layer 4), CLB (legacy)│
│  ✅ Listener = what port/protocol to listen on          │
│  ✅ Target Group = which instances receive traffic      │
│  ✅ Health Checks = periodic status checks on targets   │
│  ✅ Cross-zone LB = distribute across all AZs evenly    │
│  ✅ Single DNS name = entry point for users             │
│  ✅ Auto-scales to handle traffic spikes                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Cross-Zone Load Balancing

By default, a Load Balancer distributes traffic evenly across the Availability Zones (AZs), but it distributes to each AZ proportionally. With **cross-zone load balancing** enabled, traffic is distributed evenly across ALL instances in ALL AZs regardless of which AZ they are in. This ensures truly balanced distribution even if one AZ has more instances than another.

---

## 🧪 Hands-On Lab — Create an Application Load Balancer

```
STEP 1: Launch 2 EC2 instances (t2.micro, Free Tier):
        Instance 1: Name "WebServer-1" in Public Subnet AZ-A
        Instance 2: Name "WebServer-2" in Public Subnet AZ-B
        Attach WebServer-SG to both (allows HTTP on 80)
        User data script:
        #!/bin/bash
        yum update -y
        yum install -y httpd
        echo "Hello from Server $(hostname)" > /var/www/html/index.html
        systemctl start httpd
        systemctl enable httpd

STEP 2: Create a Target Group:
        EC2 Console → Target Groups → Create target group
        Name: My-Target-Group
        Type: Instances
        Protocol: HTTP | Port: 80
        Health check path: /
        Click "Next"

STEP 3: Register Targets:
        Select WebServer-1 and WebServer-2
        Click "Include as pending below"
        Click "Create target group"

STEP 4: Create the Load Balancer:
        EC2 Console → Load Balancers → Create Load Balancer
        Choose "Application Load Balancer"

STEP 5: Configure ALB:
        Name: My-ALB
        Scheme: Internet-facing
        IP address type: ipv4

        Network mapping:
        VPC: MyFirstVPC
        Mappings: Select 2 Availability Zones
        (select the ones with your EC2 instances)

        Security groups: Create new SG for LB:
        Allow HTTP (80) and HTTPS (443) from 0.0.0.0/0

        Listeners: HTTP:80 → Forward to My-Target-Group

STEP 6: Review and click "Create load balancer"

STEP 7: Test:
        Copy the DNS name of your ALB
        Paste in browser → you should see "Hello from Server..."
        Refresh → notice the hostname changes!
        (This means traffic is being distributed!)

✅ Your Application Load Balancer is live!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always configure health checks on a specific application endpoint (like `/health` or `/api/ping`), not just the root path. A server may be running but your application may be down. The health check should reflect your actual application status.

> 💡 **Tip 2:** Enable cross-zone load balancing if you have an uneven number of instances per Availability Zone. Otherwise, traffic may be distributed unevenly — for example, if AZ-A has 4 instances and AZ-B has 1 instance, AZ-B's single instance will receive 50% of the traffic.

> 💡 **Tip 3:** Use ALB for HTTP/HTTPS applications and NLB for anything requiring extreme performance or non-HTTP protocols. CLB (Classic Load Balancer) is legacy and should not be used for new applications. AWS recommends ALB for most use cases.

---

## ❓ Quick Quiz

**Question 1:** Your application runs on EC2 instances across 3 Availability Zones. One instance fails. What does the Load Balancer do?

```
A) It stops sending traffic to all instances in that AZ
B) It continues sending traffic to the failed instance
C) It detects the failure via health checks and
   stops sending traffic only to the failed instance
D) It automatically launches a new EC2 instance
```
**Answer: C** — The Load Balancer health check detects the unhealthy instance and removes it from the target group. Traffic continues to flow to the healthy instances.

---

**Question 2:** Which Load Balancer type operates at Layer 7 (HTTP/HTTPS) and supports path-based routing?

```
A) Classic Load Balancer (CLB)
B) Network Load Balancer (NLB)
C) Application Load Balancer (ALB)
D) Gateway Load Balancer (GWLB)
```
**Answer: C** — ALB operates at Layer 7 and supports advanced routing like path-based, host-based, and query-string routing.

---

## 🎤 Interview Questions

**Q: What is the difference between ALB and NLB?**

> ALB (Application Load Balancer) operates at Layer 7 of the OSI model and understands HTTP/HTTPS traffic. It supports advanced routing features like path-based routing (e.g., `/api/*` goes to one target group, `/app/*` goes to another), host-based routing, and query string routing. NLB (Network Load Balancer) operates at Layer 4 and handles TCP/UDP traffic with extremely low latency — measured in milliseconds. NLB is ideal for real-time applications, gaming, and streaming where performance is critical. ALB is the recommended choice for most web applications.

**Q: How do health checks work in Elastic Load Balancing?**

> The Load Balancer periodically sends requests to a configured health check endpoint on each registered target (EC2 instance, Lambda, etc.). If the target responds with a successful HTTP status code (like 200) within a specified timeout, it is considered healthy. If a target fails consecutive health checks, the Load Balancer marks it as unhealthy and stops routing traffic to it. The Load Balancer continues to perform health checks on unhealthy targets, and if they recover, they are automatically added back to the rotation.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                CHAPTER 18 SUMMARY                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ ELB = Smart reception desk for your application     │
│  ✅ Distributes traffic across healthy instances only   │
│  ✅ 3 types: ALB (HTTP/S), NLB (TCP/UDP), CLB (legacy) │
│  ✅ ALB recommended for most web applications           │
│  ✅ Listener = what port/protocol the LB listens on     │
│  ✅ Target Group = which instances get the traffic      │
│  ✅ Health Checks = automatic failure detection         │
│  ✅ Cross-zone LB = even distribution across all AZs    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
