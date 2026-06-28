---
title: "Chapter 20 — RDS — Relational Database Service"
sidebar_position: 20
description: "By the end of this chapter, you will be able to: Explain what RDS is and the database engines it supports"
---

## 📖 Story First

Every school has an official **record keeper**.

This is the person who maintains the master file of every student: name, date of birth, address, parent contact, attendance history, grades, exam scores, and graduation status. Everything is neatly organized in a massive filing cabinet. When a teacher needs a student's records, they go to the record keeper's office, and the record keeper searches the cabinet and hands them the file.

Now imagine the school clerk tries to do this with paper records. Over time:

- Papers get lost or damaged
- The filing cabinet gets full and slow to search
- If the record keeper is sick, nobody else can find anything
- If there is a fire, all records are destroyed forever

So the school buys a **proper electronic database system**. This system:

- Stores every record safely and securely
- Automatically backs up all data every night (saves a copy offsite)
- Allows authorized teachers to look up records quickly
- If the main database server fails, it automatically switches to a backup server with zero downtime
- Performs maintenance like organizing and indexing during late hours, without disturbing anyone

This is exactly what **Amazon RDS** is in AWS.

RDS is a **managed relational database service**. It takes care of all the heavy lifting of running a database — hardware provisioning, patching, backups, failure recovery — so you can focus on storing and querying your data. It supports the most popular database engines: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon's own Aurora.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what RDS is and the database engines it supports
- ✅ Understand Multi-AZ deployment for high availability
- ✅ Configure Read Replicas for read-heavy workloads
- ✅ Set up automated backups and manual snapshots

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│          SCHOOL  ←→  RDS MAPPING                       │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ School record keeper     │ RDS (Relational Database)    │
│ Student record file      │ Database Table (Rows/Records)│
│ Filing cabinet           │ Database Server (Instance)   │
│ Choice of filing system  │ Database Engine              │
│ (paper, digital, etc.)   │ (MySQL, PostgreSQL, Aurora)  │
│ Backup clerk who copies  │ Automated Backup             │
│ records to safe nightly  │ (daily snapshot + logs)      │
│ Backup record keeper in  │ Multi-AZ (standby replica    │
│ a different building     │ in different AZ)             │
│ Reading room with copies │ Read Replica (for read       │
│ of records for teachers  │ traffic only)                │
│ Late-night maintenance   │ Maintenance Window           │
│ (organizing, indexing)   │ (automated patching)         │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**Amazon RDS (Relational Database Service)** is a fully managed service that makes it easy to set up, operate, and scale relational databases in the cloud. With RDS, AWS handles the undifferentiated heavy lifting — provisioning hardware, installing database software, patching, backing up, and failing over — so you do not have to.

### Supported Database Engines

RDS supports six database engines:

```
┌─────────────────────────────────────────────────────────────┐
│              RDS SUPPORTED DATABASE ENGINES                  │
├─────────────────┬───────────────────────────────────────────┤
│   ENGINE        │  BEST FOR                                 │
├─────────────────┼───────────────────────────────────────────┤
│   MySQL         │  Open-source, widely used, great for web  │
│   PostgreSQL    │  Advanced open-source, rich features, GIS │
│   MariaDB       │  MySQL-compatible, improved performance   │
│   Oracle        │  Enterprise workloads, existing Oracle DB │
│   SQL Server    │  .NET applications, Windows environments  │
│   Aurora        │  AWS-native, 5x faster than MySQL,        │
│                 │  3x faster than PostgreSQL, auto-scaling  │
└─────────────────┴───────────────────────────────────────────┘
```

### Multi-AZ Deployment

**Multi-AZ** provides high availability by automatically provisioning and maintaining a standby replica in a different Availability Zone. If the primary database fails, RDS automatically fails over to the standby with zero manual intervention.

```
┌─────────────────────────────────────────────────────────┐
│                 MULTI-AZ VS READ REPLICA                │
├──────────────────────────┬──────────────────────────────┤
│   MULTI-AZ               │   READ REPLICA               │
├──────────────────────────┼──────────────────────────────┤
│ Purpose: High            │ Purpose: Read performance    │
│ availability             │                              │
│ Synchronous replication  │ Asynchronous replication     │
│ One standby (cannot      │ Up to 15 read replicas      │
│ be used for reads)       │ Can serve read traffic       │
│ Automatic failover       │ Manual promotion to primary  │
│ Same region (different   │ Cross-region possible        │
│ AZ)                      │                              │
│ No performance benefit   │ Offloads read traffic from   │
│ for reads                │ primary DB                   │
└──────────────────────────┴──────────────────────────────┘
```

### Automated Backups vs Manual Snapshots

```
┌─────────────────────────────────────────────────────────────┐
│          BACKUP TYPES IN RDS                                │
├────────────────────┬────────────────────────────────────────┤
│  AUTOMATED BACKUP  │  MANUAL SNAPSHOT                       │
├────────────────────┼────────────────────────────────────────┤
│ Automatic (enabled │ Manual (you trigger)                   │
│ by default)        │                                       │
│ Retention: 1-35    │ Retained indefinitely until you delete │
│ days               │                                       │
│ Point-in-time      │ Full snapshot only                     │
│ recovery (any      │                                       │
│ second within       │                                       │
│ retention period)  │                                       │
│ Deleted when DB    │ Persists even if DB is deleted         │
│ instance is deleted│                                       │
└────────────────────┴────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                 KEY FACTS TABLE                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ RDS = Managed relational database in the cloud      │
│  ✅ Supports 6 engines: MySQL, PG, MariaDB, Oracle,     │
│     SQL Server, Aurora                                  │
│  ✅ Multi-AZ = standby replica in another AZ for HA     │
│  ✅ Read Replica = up to 15 copies for read offloading  │
│  ✅ Automated backups: retention up to 35 days          │
│  ✅ Manual snapshots: retained until you delete them    │
│  ✅ Automated patching during maintenance windows       │
│  ✅ No SSH access to DB server (AWS manages it)         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Hands-On Lab — Launch an RDS Database

```
STEP 1: Go to RDS Console → Create database

STEP 2: Choose engine:
        Engine: MySQL
        Edition: MySQL Community
        Version: MySQL 8.0 (default)

STEP 3: Choose template:
        Select: Free Tier
        (For learning — never use Free Tier for production!)

STEP 4: Configure instance:
        DB instance identifier: my-school-db
        Master username: admin
        Master password: ChooseSecurePassword123!

STEP 5: Instance configuration:
        DB instance class: db.t2.micro (Free Tier eligible)
        Storage type: gp2
        Allocated storage: 20 GB
        Storage autoscaling: Enable (max 100 GB)

STEP 6: Connectivity:
        VPC: MyFirstVPC
        Subnet group: Auto-create (RDS creates one)
        Public access: No (database should be private!)
        VPC Security Group: Create new "Database-SG"
        Inbound rules: Allow MySQL (3306) from WebServer-SG

STEP 7: Database authentication:
        Password authentication (default)

STEP 8: Additional configuration:
        Initial database name: schooldb
        Automated backups: Enable
        Backup retention period: 7 days
        Backup window: 03:00 - 04:00 UTC
        Maintenance window: Sun 05:00 - 06:00 UTC
        Deletion protection: Enable (prevents accidental delete)
        Click "Create database"

STEP 9: Wait (5-10 minutes):
        Status will change from "Creating" to "Available"

STEP 10: Get connection details:
        Click on the DB instance
        Copy the Endpoint (e.g., my-school-db.xxxxx.us-east-1.rds.amazonaws.com)
        This is the address your application uses to connect!

✅ Your RDS database is ready!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Never make your RDS database publicly accessible. Your database should live in a private subnet and only be accessible by your application servers via Security Group rules. Exposing your database to the internet is a major security vulnerability.

> 💡 **Tip 2:** Enable deletion protection on all production databases. This simple checkbox prevents accidental deletion of your database — even if someone runs a delete command, RDS will refuse if deletion protection is on.

> 💡 **Tip 3:** Use Read Replicas to offload read traffic from your primary database. If your application is read-heavy (like reporting dashboards), create Read Replicas in different regions to improve latency for global users.

---

## ❓ Quick Quiz

**Question 1:** You need your database to automatically failover to a standby if the primary fails. Which feature should you use?

```
A) Read Replica
B) Multi-AZ deployment
C) Automated backups
D) Manual snapshot
```
**Answer: B** — Multi-AZ provisions a standby replica in a different AZ. If the primary fails, RDS automatically fails over to the standby with no manual intervention.

---

**Question 2:** What is the maximum retention period for automated backups in RDS?

```
A) 7 days
B) 15 days
C) 35 days
D) Indefinitely (until you delete)
```
**Answer: C** — Automated backups can be retained for up to 35 days. If you need backups for longer than 35 days, take a manual snapshot (which is retained indefinitely).

---

## 🎤 Interview Questions

**Q: What is the difference between Multi-AZ and Read Replicas in RDS?**

> Multi-AZ is for high availability. It provisions a synchronous standby replica in a different Availability Zone. If the primary fails, RDS automatically fails over to the standby. The standby cannot be used for read traffic. Read Replicas are for performance. They are asynchronous copies that can be used to offload read queries from the primary database. You can have up to 15 Read Replicas, and they can be cross-region. The key distinction is: Multi-AZ for availability, Read Replicas for performance.

**Q: Why use RDS instead of installing a database on an EC2 instance?**

> RDS is managed — AWS handles hardware provisioning, software patching, automated backups, failure detection, and failover. This frees developers from database administration. With EC2, you must manage everything yourself: install the DB software, apply patches, configure backups, handle failover manually. RDS also makes it easy to scale storage, provision Read Replicas, and enable Multi-AZ with a few clicks. The tradeoff is cost (RDS is slightly more expensive than running your own EC2 database) and lack of SSH access (you cannot customize the underlying OS).

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                CHAPTER 20 SUMMARY                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ RDS = Managed relational database in the cloud      │
│  ✅ Like school record keeper with backup and safety    │
│  ✅ Supports MySQL, PostgreSQL, MariaDB, Oracle,        │
│     SQL Server, Aurora                                  │
│  ✅ Multi-AZ = standby replica for high availability    │
│  ✅ Read Replica = up to 15 copies for read scaling     │
│  ✅ Automated backups retained up to 35 days            │
│  ✅ Manual snapshots kept until you delete them         │
│  ✅ DB should be in private subnet — never public       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
