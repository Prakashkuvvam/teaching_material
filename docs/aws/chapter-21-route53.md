---
title: "Chapter 21 — Route 53 — DNS Service"
sidebar_position: 21
description: "By the end of this chapter, you will be able to: Explain what DNS is and what Route 53 does"
---

## 📖 Story First

Every school has a **school directory** or a **phone book**.

When a parent wants to contact the Math teacher, they do not just walk around the school shouting "Math teacher! Math teacher!" Instead, they look up the school's phone book: *"Math Department — Room 201, Extension 120"*. They dial extension 120 and reach exactly the right person.

Now imagine the school directory is smart:

- If you call the **main school number**, the directory asks: "Press 1 for Admissions, Press 2 for Academics, Press 3 for Administration."
- If the Science teacher is on leave, the directory **automatically** redirects you to the substitute teacher.
- If the school opens a second campus, the directory can send **some parents to Campus A** and **some to Campus B** based on their location.
- If the school's phone system fails, the directory automatically sends calls to a backup number.

This is exactly what **Amazon Route 53** does.

Route 53 is a **DNS (Domain Name System) web service**. It translates human-readable domain names like `www.myschool.com` into computer-readable IP addresses like `192.0.2.1`. It also provides advanced routing, health checking, and domain registration — all in one service.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what DNS is and what Route 53 does
- ✅ Understand common DNS record types: A, AAAA, CNAME, MX, TXT, ALIAS
- ✅ Configure routing policies: Simple, Weighted, Latency, Failover, Geo
- ✅ Set up DNS health checks and failover

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│      SCHOOL  ←→  ROUTE 53 MAPPING                      │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ School phone book        │ Route 53 (DNS Service)       │
│ "Math Dept → Room 201"   │ A Record (domain → IPv4)     │
│ "New Website → IP"       │ AAAA Record (domain → IPv6)  │
│ "Call main number and    │ CNAME Record (alias from     │
│ ask for Admissions"      │ one domain to another)       │
│ "Send mail to school"    │ MX Record (mail server)      │
│ "Verify school identity" │ TXT Record (verification)    │
│ School directory auto-   │ Simple Routing (one-to-one)  │
│ matically says where     │                             │
│ Press 1: Admissions      │ Weighted Routing (sends %    │
│ Press 2: Academics       │ traffic to diff. endpoints)  │
│ Send caller to nearest   │ Latency Routing (lowest      │
│ campus                   │ latency wins)               │
│ If main line is down,    │ Failover Routing (primary/   │
│ redirect to backup       │ secondary)                   │
│ Branch campus per city   │ Geo Routing (based on        │
│                          │ geographic location)         │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**Amazon Route 53** is a highly available and scalable **Domain Name System (DNS) web service**. It performs three main functions:

1. **Domain Registration** — You can buy domain names (like `myschool.com`) directly through Route 53.
2. **DNS Routing** — Route 53 connects user requests to your AWS resources (EC2, ALB, S3, CloudFront) by translating domain names to IP addresses.
3. **Health Checking** — Route 53 monitors the health of your endpoints and automatically routes traffic away from unhealthy resources.

### DNS Record Types

```
┌─────────────────────────────────────────────────────────────┐
│                  COMMON DNS RECORDS IN ROUTE 53              │
├───────────┬──────────────┬───────────────────────────────────┤
│  RECORD   │  MAPS         │  USE CASE                       │
├───────────┼──────────────┼──────────────────────────────────┤
│     A     │ domain → IPv4 │ "myschool.com → 192.0.2.1"      │
│   AAAA    │ domain → IPv6 │ "myschool.com → 2001:db8::1"    │
│   CNAME   │ domain →      │ "www.myschool.com →             │
│           │ another domain│ myschool.com" (also: ALB DNS)   │
│    MX     │ domain → mail │ "myschool.com → mail.myschool   │
│           │ server        │ .com"                           │
│    TXT    │ domain → text │ "Verify domain ownership"       │
│   ALIAS   │ domain → AWS  │ "myschool.com → ALB DNS name"   │
│           │ resource      │ (free, works at zone apex)     │
└───────────┴──────────────┴──────────────────────────────────┘
```

### CNAME vs ALIAS — Important Distinction

```
┌─────────────────────────────────────────────────────────────┐
│                   CNAME vs ALIAS                            │
├───────────────────────────┬─────────────────────────────────┤
│   CNAME                   │   ALIAS                         │
├───────────────────────────┼─────────────────────────────────┤
│ Maps one domain to another│ Maps domain to AWS resource     │
│ (e.g., www → root)        │ (e.g., root → ALB DNS)         │
│                           │                                 │
│ CANNOT be used at root    │ CAN be used at zone apex        │
│ (apex) of domain          │ (root domain like myschool.com) │
│ (myschool.com cannot      │                                 │
│ have a CNAME)             │                                 │
│                           │                                 │
│ You pay for CNAME query   │ Free (no extra charge)          │
│                           │                                 │
│ Works for any domain name │ Works only for AWS resources    │
│ (AWS or non-AWS)          │ (ELB, CloudFront, S3, etc.)     │
└───────────────────────────┴─────────────────────────────────┘
```

### Routing Policies

Route 53 offers several routing policies to control how traffic flows to your resources:

```
┌─────────────────────────────────────────────────────────────┐
│                ROUTING POLICIES                             │
├───────────────┬─────────────────────────────────────────────┤
│   POLICY      │  BEHAVIOR                                   │
├───────────────┼─────────────────────────────────────────────┤
│ Simple        │ Routes to a single endpoint (e.g., one EC2) │
│               │ School: Directory with one entry per person │
├───────────────┼─────────────────────────────────────────────┤
│ Weighted      │ Routes % of traffic to different endpoints  │
│               │ School: Canary testing — send 10% of new    │
│               │ students to the new campus, 90% to old      │
├───────────────┼─────────────────────────────────────────────┤
│ Latency       │ Routes to the region with lowest latency    │
│               │ School: Parent calls — route to the campus  │
│               │ closest to their home                       │
├───────────────┼─────────────────────────────────────────────┤
│ Failover      │ Routes to primary; if unhealthy, to backup  │
│               │ School: If main line is down, auto-redirect │
│               │ to emergency number                         │
├───────────────┼─────────────────────────────────────────────┤
│ Geolocation   │ Routes based on geographic location         │
│               │ School: Students in North district go to    │
│               │ North Campus, South district → South Campus │
└───────────────┴─────────────────────────────────────────────┘
```

### Health Checks

Route 53 health checks monitor the health of your resources. You configure a health check to periodically check an endpoint (e.g., your web server at `/health`). If the endpoint fails a configurable number of consecutive checks, Route 53 marks it as unhealthy and stops routing traffic to it — enabling automatic DNS failover.

```
┌─────────────────────────────────────────────────────────┐
│                 KEY FACTS TABLE                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Route 53 = AWS DNS service (domain → IP)           │
│  ✅ 3 functions: Register domains, Route traffic,       │
│     Health checking                                     │
│  ✅ Record types: A, AAAA, CNAME, MX, TXT, ALIAS       │
│  ✅ ALIAS works at zone apex (unlike CNAME)             │
│  ✅ Routing policies: Simple, Weighted, Latency,        │
│     Failover, Geo                                       │
│  ✅ Health checks enable automatic DNS failover         │
│  ✅ 100% SLA — most reliable AWS service                │
│  ✅ Pay only for what you use (hosted zones, queries)   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Hands-On Lab — Set Up Route 53 for Your Application

```
PART A: Create a Hosted Zone

STEP 1: Go to Route 53 Console

STEP 2: Click "Hosted zones" → "Create hosted zone"
        Domain name: yourdomain.com (use a domain you own)
        Type: Public hosted zone
        Click "Create"

STEP 3: Note the 4 nameserver (NS) records shown.
        You must update your domain registrar's NS records
        to point to these Route 53 nameservers.
        (This tells the internet: "Route 53 manages my DNS")

---

PART B: Create Record for Your Application

STEP 4: Click "Create record"
        Record name: www
        Record type: A
        Alias: Toggle ON
        Choose target: ALB (select My-ALB)
        Routing policy: Simple
        Click "Create"

STEP 5: Test:
        After DNS propagates (few mins to 48 hours):
        Open browser → www.yourdomain.com
        You should see your application!

---

PART C: Set Up Failover Routing (Optional)

STEP 6: Create two records:
        Record 1:
        Name: app
        Type: A
        Alias: Yes → ALB in us-east-1
        Routing policy: Failover
        Failover record type: Primary
        Associate health check: Create new health check
        Health check endpoint: EC2 instance IP or ALB DNS
        Click "Create"

        Record 2:
        Name: app
        Type: A
        Alias: Yes → ALB in us-west-2
        Routing policy: Failover
        Failover record type: Secondary
        Click "Create"

STEP 7: Test failover:
        Stop your primary EC2 instance
        Wait 30-60 seconds
        Visit app.yourdomain.com
        It should now show the backup in us-west-2!

✅ Your DNS is configured with failover!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always use ALIAS records when pointing a domain to AWS resources like ELB, CloudFront, or S3. ALIAS records work at the zone apex (root domain) and are free. CNAME records cannot be used at the zone apex and cost money for the query.

> 💡 **Tip 2:** Use Weighted routing for canary deployments. If you want to test a new version of your application, create a weighted record that sends 10% of traffic to the new version and 90% to the old version. Monitor performance, then shift more traffic if the new version is stable.

> 💡 **Tip 3:** Set up health checks for all production records. Without health checks, Route 53 will route traffic to your endpoint even if it is down. A health check + failover routing policy ensures your users always reach a healthy server.

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "You need to point `myschool.com` (zone apex) to an Application Load Balancer. Which record type should you use?",
        "options": [
            "CNAME record",
            "A record with ALIAS",
            "MX record",
            "TXT record"
        ],
        "correct": 1,
        "explanation": "You cannot use a CNAME at the zone apex. Use an A record with ALIAS enabled to point the root domain to an AWS resource like an ALB."
    },
    {
        "id": 2,
        "question": "You want to send 10% of your users to a new version of your application for testing. Which routing policy should you use?",
        "options": [
            "Simple",
            "Failover",
            "Weighted",
            "Latency"
        ],
        "correct": 2,
        "explanation": "Weighted routing allows you to distribute traffic across multiple endpoints by assigning weights (e.g., 10 for new version, 90 for old version)."
    }
]} />

---

## 🎤 Interview Questions

**Q: What is the difference between a CNAME record and an ALIAS record in Route 53?**

> A CNAME record maps one domain name to another domain name (e.g., `www.example.com` to `example.com`). CNAME records cannot be used at the zone apex (the root domain like `example.com`). An ALIAS record also maps a domain to another domain, but it can be used at the zone apex. ALIAS records can only be used to map to AWS resources like ELB, CloudFront, or S3. Additionally, ALIAS records are free, while CNAME queries incur a small charge. AWS recommends using ALIAS records whenever you are routing to an AWS resource.

**Q: Explain how DNS resolution works when a user types `www.myschool.com` in their browser.**

> The browser first checks its local cache. If not found, it queries a DNS resolver (usually provided by the ISP). The resolver queries the Root DNS servers, which direct it to the TLD (Top-Level Domain) servers for `.com`. The TLD servers direct it to the authoritative nameservers for `myschool.com` — in this case, Route 53. Route 53 looks up the record for `www.myschool.com` (e.g., an A record or ALIAS pointing to an ALB) and returns the IP address. The resolver caches this result and returns it to the browser. The browser then makes an HTTP request to that IP address, which reaches the Load Balancer, which forwards traffic to healthy EC2 instances.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                CHAPTER 21 SUMMARY                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Route 53 = AWS DNS service (domain → IP)            │
│  ✅ Like a school phone book or directory               │
│  ✅ A Record: domain → IPv4                             │
│  ✅ AAAA Record: domain → IPv6                          │
│  ✅ CNAME: domain → another domain (not at apex)        │
│  ✅ ALIAS: domain → AWS resource (works at apex)        │
│  ✅ 5 routing policies: Simple, Weighted, Latency,      │
│     Failover, Geo                                       │
│  ✅ Health checks enable automatic DNS failover         │
│  ✅ 100% SLA — most reliable service in AWS             │
│  ✅ Always use ALIAS for zone apex records              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
