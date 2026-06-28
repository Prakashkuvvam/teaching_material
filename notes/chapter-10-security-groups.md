# CHAPTER 10
# Security Groups

---

## 📖 Story First

Think about the school's Science Laboratory.

Not everyone can walk in. There is a security guard at the door. This guard has a very specific list:

*"Allow Class 10 students in during Period 3."*
*"Allow the Science teacher to enter anytime."*
*"Allow delivery of chemicals from the authorized supplier."*
*"Everyone else — please step back."*

The security guard checks everyone who tries to enter. Only those on the approved list get in. Others are turned away.

But here is something interesting about this guard. The guard does NOT check people who are leaving. If a student is already inside the lab and wants to walk out, the guard just lets them go without checking.

This is exactly how **Security Groups** work in AWS.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what a Security Group is
- ✅ Understand Inbound and Outbound rules
- ✅ Know that Security Groups are stateful
- ✅ Write basic Security Group rules
- ✅ Attach Security Groups to EC2 instances

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│         SCHOOL  ←→  SECURITY GROUP MAPPING             │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Security guard at lab    │ Security Group               │
│ door                     │                             │
│ Allowed entry list       │ Inbound Rules               │
│ Anyone inside can leave  │ Outbound Rules (allow all   │
│ (not checked at exit)    │ by default, stateful)       │
│ Specific to this lab     │ Applied to specific EC2     │
│                          │ instances                   │
│ Can have same guard at   │ One Security Group can be   │
│ multiple rooms           │ applied to multiple servers  │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

A **Security Group** is a virtual firewall that controls inbound and outbound traffic for AWS resources like EC2 instances.

Key characteristics:

```
┌─────────────────────────────────────────────────────────┐
│              SECURITY GROUP KEY FACTS                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Acts as a firewall at the INSTANCE level            │
│  ✅ Attached to EC2 instances (not subnets)             │
│  ✅ Has INBOUND rules (who can come in)                 │
│  ✅ Has OUTBOUND rules (what can go out)                │
│  ✅ STATEFUL — if traffic is allowed in,               │
│     response automatically allowed out                 │
│  ✅ Default: DENY all inbound                           │
│  ✅ Default: ALLOW all outbound                         │
│  ✅ Only ALLOW rules, no explicit DENY rules            │
│  ✅ Multiple SGs can be applied to one instance         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Understanding Security Group Rules

Each rule in a Security Group has these parts:

```
┌────────────┬──────────┬───────────────┬────────────────────┐
│  Protocol  │   Port   │    Source     │    Description     │
├────────────┼──────────┼───────────────┼────────────────────┤
│   TCP      │   80     │  0.0.0.0/0   │ Allow HTTP from    │
│            │          │               │ anywhere           │
├────────────┼──────────┼───────────────┼────────────────────┤
│   TCP      │   443    │  0.0.0.0/0   │ Allow HTTPS from   │
│            │          │               │ anywhere           │
├────────────┼──────────┼───────────────┼────────────────────┤
│   TCP      │   22     │ 203.0.113.5/32│ Allow SSH from     │
│            │          │               │ my IP only         │
├────────────┼──────────┼───────────────┼────────────────────┤
│   TCP      │  3306    │  sg-xxxxxxx   │ Allow MySQL from   │
│            │          │               │ App Server SG only │
└────────────┴──────────┴───────────────┴────────────────────┘
```

---

## 🔑 Common Port Numbers to Remember

```
┌──────────────────────────────────────────────────────┐
│               IMPORTANT PORT NUMBERS                 │
├───────────┬──────────────────────────────────────────┤
│   PORT    │  SERVICE                                 │
├───────────┼──────────────────────────────────────────┤
│    22     │  SSH (Linux server login)                │
│    80     │  HTTP (regular web traffic)              │
│   443     │  HTTPS (secure web traffic)              │
│  3306     │  MySQL / Aurora (database)               │
│  5432     │  PostgreSQL (database)                   │
│  3389     │  RDP (Windows server login)              │
│  6379     │  Redis (cache)                           │
│  27017    │  MongoDB (database)                      │
└───────────┴──────────────────────────────────────────┘
```

---

## 🔁 Stateful — The Most Important Property

Security Groups are **stateful**.

This means: If you allow a request IN, the response is automatically allowed OUT — without needing a separate outbound rule.

```
WITHOUT STATEFUL (like some firewalls):
You need BOTH:
→ Rule to allow: HTTP request IN (port 80)
→ Rule to allow: HTTP response OUT (port 12345)

WITH STATEFUL (Security Groups):
You only need:
→ Rule to allow: HTTP request IN (port 80)
→ Response automatically goes out. No extra rule needed!

Think of it like a revolving door.
If you are allowed to enter, you automatically are 
allowed to exit through the same door.
```

---

## 🏗️ Security Group for a Web Server — Example

Let us design a Security Group for a web server:

```
WEB SERVER SECURITY GROUP: "WebServer-SG"

INBOUND RULES:
┌──────────┬──────┬───────────────┬──────────────────────┐
│ Protocol │ Port │    Source     │     Purpose          │
├──────────┼──────┼───────────────┼──────────────────────┤
│   TCP    │  80  │  0.0.0.0/0   │ Allow all HTTP       │
│   TCP    │ 443  │  0.0.0.0/0   │ Allow all HTTPS      │
│   TCP    │  22  │ YOUR_IP/32   │ SSH only from you    │
└──────────┴──────┴───────────────┴──────────────────────┘

OUTBOUND RULES:
┌──────────┬──────┬───────────────┬──────────────────────┐
│ All traffic │ All│  0.0.0.0/0   │ Allow all outbound   │
└──────────┴──────┴───────────────┴──────────────────────┘
```

---

## 🏗️ Security Group for a Database — Example

```
DATABASE SECURITY GROUP: "Database-SG"

INBOUND RULES:
┌──────────┬──────┬──────────────────┬────────────────────┐
│ Protocol │ Port │    Source        │     Purpose        │
├──────────┼──────┼──────────────────┼────────────────────┤
│   TCP    │ 3306 │ WebServer-SG     │ Only web servers   │
│          │      │ (Security Group  │ can connect to DB  │
│          │      │  reference)      │                    │
└──────────┴──────┴──────────────────┴────────────────────┘

OUTBOUND RULES:
┌──────────┬──────┬───────────────┬──────────────────────┐
│ All traffic │ All│  0.0.0.0/0   │ Allow all outbound   │
└──────────┴──────┴───────────────┴──────────────────────┘

NOTE: Database allows connections ONLY from WebServer-SG.
This means only the web server can talk to the database.
Not random internet users. This is very secure design.
```

---

## 🧪 Hands-On Lab — Create a Security Group

```
STEP 1: Go to EC2 Console → Security Groups
        Click "Create security group"

STEP 2: Fill in basics:
        Security group name: WebServer-SG
        Description: Security group for web servers
        VPC: MyFirstVPC

STEP 3: Add Inbound Rules:
        Click "Add rule"
        
        Rule 1:
        Type: HTTP | Port: 80 | Source: Anywhere-IPv4
        
        Rule 2:
        Type: HTTPS | Port: 443 | Source: Anywhere-IPv4
        
        Rule 3:
        Type: SSH | Port: 22 | Source: My IP
        (AWS will auto-fill your current IP)

STEP 4: Outbound Rules:
        Leave default (Allow All)

STEP 5: Click "Create security group"

✅ Your Security Group is ready!
   You will attach it to an EC2 instance in Chapter 12.
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Never allow SSH (port 22) from 0.0.0.0/0 (anywhere). This is a major security risk. Always restrict SSH to your own IP address only.

> 💡 **Tip 2:** Instead of allowing traffic from an IP address, reference another Security Group as the source. This is much more secure and maintainable — if the server changes IP, the rule still works.

> 💡 **Tip 3:** Security Groups are your FIRST line of defense. Always apply the principle of least privilege — only allow what is absolutely necessary.

---

## ❓ Quick Quiz

**Question 1:** What is the default inbound rule for a new Security Group?

```
A) Allow all traffic
B) Deny all traffic
C) Allow only HTTP traffic
D) Allow only from within the VPC
```
**Answer: B** — By default, all inbound traffic is denied.

---

**Question 2:** What does "stateful" mean for Security Groups?

```
A) Security Groups never change
B) If inbound traffic is allowed, the response
   automatically goes out without an extra rule
C) All traffic is blocked by default
D) Rules apply to both subnets and instances
```
**Answer: B**

---

## 🎤 Interview Questions

**Q: What is a Security Group and how does it work?**

> A Security Group is a virtual firewall that controls inbound and outbound traffic to AWS resources like EC2 instances. It operates at the instance level (not the subnet level). It is stateful, meaning that if you allow traffic in, the return traffic is automatically allowed out. By default, all inbound traffic is denied and all outbound traffic is allowed.

**Q: What is the difference between Security Groups and Network ACLs?**

> Security Groups operate at the instance level and are stateful — you only need to define one-way rules. Network ACLs operate at the subnet level and are stateless — you must explicitly define both inbound and outbound rules. Security Groups can only have allow rules, while Network ACLs can have both allow and deny rules.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 10 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Security Group = Virtual firewall for instances     │
│  ✅ Like a security guard with an approved list         │
│  ✅ Has Inbound Rules (who can come in)                 │
│  ✅ Has Outbound Rules (what can go out)                │
│  ✅ STATEFUL — response traffic automatically allowed   │
│  ✅ Default: Deny ALL inbound                           │
│  ✅ Default: Allow ALL outbound                         │
│  ✅ Only ALLOW rules — no explicit DENY                 │
│  ✅ Can reference other SGs as source                   │
│  ✅ Never allow SSH from 0.0.0.0/0                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
