---
title: "Chapter 11 — Network ACLs (NACLs)"
sidebar_position: 11
description: "By the end of this chapter, you will be able to: Explain what a Network ACL is"
---


---

## 📖 Story First

Security Groups are like guards at each individual room's door.

But the school also has another layer of security — **guards at each Wing's entrance**.

Before you even reach the Science Lab's door guard, you must first pass through the **Science Wing Entrance Guard**.

This Wing Guard has a different set of rules. And this guard is stricter:

*"Student ID 10050 is permanently banned from this Wing — DENY"*
*"All students with valid IDs — ALLOW"*

But there is a twist. This Wing Guard is NOT as smart as the door guard. This guard checks people going IN, and also checks people coming OUT — separately, with different lists. Just because you were allowed in does not mean you are automatically allowed out. You need to be on both lists.

**This Wing Guard is the Network ACL.**

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what a Network ACL is
- ✅ Understand the difference from Security Groups
- ✅ Know what stateless means
- ✅ Understand rule numbering and priority

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│          SCHOOL  ←→  NETWORK ACL MAPPING               │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Wing Entrance Guard      │ Network ACL                  │
│ Checks everyone in/out   │ Stateless - checks both      │
│ of the wing              │ inbound and outbound         │
│ Works at Wing level      │ Works at Subnet level        │
│ Can DENY specific people │ Can have DENY rules          │
│ Numbered entry on list   │ Numbered rules               │
│ First matching rule wins │ Lowest rule number wins      │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ Security Groups vs Network ACLs — Full Comparison

```
┌─────────────────────────────────────────────────────────────┐
│           SECURITY GROUP  vs  NETWORK ACL                   │
├───────────────────────────┬─────────────────────────────────┤
│     SECURITY GROUP        │       NETWORK ACL               │
├───────────────────────────┼─────────────────────────────────┤
│ Instance level            │ Subnet level                    │
│ (applied to one server)   │ (applied to entire subnet)      │
│                           │                                 │
│ STATEFUL                  │ STATELESS                       │
│ (response auto allowed)   │ (must define rules both ways)   │
│                           │                                 │
│ Only ALLOW rules          │ ALLOW and DENY rules            │
│                           │                                 │
│ All rules evaluated       │ Rules evaluated in NUMBER order │
│                           │ First match wins                │
│                           │                                 │
│ Think of it as:           │ Think of it as:                 │
│ Room door guard           │ Wing entrance guard             │
│                           │                                 │
│ First line: No            │ First line: Yes                 │
│ (works after NACL)        │ (works before SG)               │
└───────────────────────────┴─────────────────────────────────┘
```

---

## 📊 Order of Traffic Evaluation

When a request comes in from the internet:

```
INTERNET REQUEST
      │
      ▼
 INTERNET GATEWAY
      │
      ▼
  NETWORK ACL   ← First check (Subnet level)
  (Check inbound rules)
      │
      │  If ALLOWED...
      ▼
 SECURITY GROUP  ← Second check (Instance level)
  (Check inbound rules)
      │
      │  If ALLOWED...
      ▼
  YOUR SERVER (EC2)
```

Traffic must pass BOTH the NACL AND the Security Group to reach your server.

---

## 🔢 NACL Rule Numbering

Network ACL rules have numbers. Lower numbers are evaluated first.

```
NACL INBOUND RULES (Example):

Rule #  | Protocol | Port | Source       | Allow/Deny
--------|----------|------|--------------|----------
  100   |   TCP    |  80  | 0.0.0.0/0   | ALLOW
  200   |   TCP    | 443  | 0.0.0.0/0   | ALLOW
  300   |   TCP    |  22  | 0.0.0.0/0   | DENY
  400   |   TCP    |  22  | 10.0.0.5/32 | ALLOW
  *     |   ALL    | ALL  | 0.0.0.0/0   | DENY

⚠️ PROBLEM with rules above:
Rule 300 DENIES all SSH before Rule 400 can ALLOW your IP.
Rules are evaluated in order — first match wins!

CORRECT VERSION:

Rule #  | Protocol | Port | Source       | Allow/Deny
--------|----------|------|--------------|----------
  100   |   TCP    |  80  | 0.0.0.0/0   | ALLOW
  200   |   TCP    | 443  | 0.0.0.0/0   | ALLOW
  300   |   TCP    |  22  | 10.0.0.5/32 | ALLOW  ← first
  400   |   TCP    |  22  | 0.0.0.0/0   | DENY   ← then deny rest
  *     |   ALL    | ALL  | 0.0.0.0/0   | DENY
```

---

## ⚠️ NACL is Stateless — This Matters!

Because NACLs are stateless, you MUST define rules for both directions.

```
SCENARIO: Web server receives HTTP requests.

IN A STATEFUL SYSTEM (Security Group):
→ Allow inbound port 80 (HTTP)
→ Response automatically allowed outbound ✅

IN A STATELESS SYSTEM (NACL):
→ Allow inbound port 80 (HTTP request)         ← needed
→ Allow outbound port 1024-65535 (response)    ← ALSO needed!

The response traffic comes back on an ephemeral port
(temporary high-number port like 32768-65535).
You MUST allow these outbound ports in the NACL,
or the response will be BLOCKED on the way out.

NACL OUTBOUND RULES MUST INCLUDE:
Protocol: TCP | Port: 1024-65535 | Destination: 0.0.0.0/0 | ALLOW
```

---

## 💡 When to Use NACLs?

```
┌─────────────────────────────────────────────────────────┐
│              WHEN TO USE NACL vs SG                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  USE NACL WHEN:                                        │
│  → You need to BLOCK a specific IP address             │
│  → You want an extra layer of security at subnet level  │
│  → You need to deny specific traffic patterns          │
│                                                         │
│  USE SECURITY GROUP WHEN:                              │
│  → You want to control traffic at instance level       │
│  → You want simpler stateful rules                     │
│  → You want to reference other Security Groups         │
│                                                         │
│  BEST PRACTICE:                                        │
│  Use BOTH together for defense in depth.               │
│  Default NACL allows all traffic — start with SG.      │
│  Add NACL rules only when you need subnet-level blocks. │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ❓ Quick Quiz

**Question 1:** A Network ACL has these rules:
- Rule 100: DENY SSH from 0.0.0.0/0
- Rule 200: ALLOW SSH from your IP

Can you SSH into your server?

```
A) Yes, because Rule 200 allows your IP
B) No, because Rule 100 matches first and denies all SSH
C) Yes, because your IP is whitelisted
D) No, because SSH is not allowed in any NACL
```
**Answer: B** — Rules evaluated in number order. Rule 100 matches first.

---

**Question 2:** What is the key difference between Security Groups and NACLs?

```
A) Security Groups cost more
B) Security Groups are stateful, NACLs are stateless
C) NACLs work at instance level, SGs at subnet level
D) NACLs are older and less effective
```
**Answer: B**

---

## 🎤 Interview Questions

**Q: What is the difference between Security Groups and NACLs?**

> Security Groups operate at the EC2 instance level and are stateful — meaning if you allow inbound traffic, the response is automatically allowed outbound. They can only have allow rules. Network ACLs operate at the subnet level and are stateless — you must explicitly define both inbound and outbound rules. NACLs can have both allow and deny rules, and rules are evaluated in numbered order where the lowest number wins.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 11 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ NACL = Firewall at Subnet level                     │
│  ✅ Like Wing entrance guards at school                 │
│  ✅ STATELESS — must define rules both ways             │
│  ✅ Can have ALLOW and DENY rules                       │
│  ✅ Rules evaluated in number order (lowest first)      │
│  ✅ First matching rule wins — order matters!           │
│  ✅ Default NACL allows all traffic                     │
│  ✅ Traffic hits NACL BEFORE Security Group             │
│  ✅ Use for subnet-level IP blocking                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
