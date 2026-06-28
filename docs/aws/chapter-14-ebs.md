---
title: "Chapter 14 — EBS — Elastic Block Store"
sidebar_position: 14
description: "By the end of this chapter, you will be able to: Explain what EBS is and how it differs from instance store"
---


---

## 📖 Story First

The school has given every student a locker. Each locker has a specific size:
- Some lockers are small — just enough for a lunchbox and a notebook.
- Some lockers are medium — can fit textbooks and a jacket.
- Some lockers are large — can fit everything a student might need.

The locker is **directly assigned to that student**. Nobody else can use it. If the student moves to a different classroom, the locker moves with them. And here is the key thing — the locker is just storage space. The student provides the brainpower (the actual computing).

But there is another storage concept in the school — the **library**. The library has books that multiple students can read at the same time. That is shared storage. That is the topic of the next chapter (EFS).

For now, focus on the locker.

The locker is **block storage**. It behaves exactly like a hard drive attached to your computer. You can format it. You can put files on it. You can take files off. It is your private storage space.

In AWS, this private, attached storage for an EC2 instance is called **Elastic Block Store (EBS)** .

An EBS volume is a durable, block-level storage device that you attach to a single EC2 instance. It persists independently from the instance — if you stop or terminate the EC2 instance, the EBS volume (if configured correctly) survives and can be reattached to another instance.

This is like a student's locker. The student (EC2 instance) can leave the school, but the locker (EBS volume) stays. A new student can use the same locker.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what EBS is and how it differs from instance store
- ✅ Identify EBS volume types and their use cases
- ✅ Understand EBS snapshots for backup and migration
- ✅ Manage root volumes vs data volumes

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│              SCHOOL  ←→  EBS MAPPING                    │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Student's personal locker│ EBS Volume                   │
│ Locker attached to       │ EBS attached to one EC2      │
│   one specific student   │   at a time                  │
│ Different locker sizes   │ Different EBS volume sizes   │
│ (small, medium, large)   │ (1 GB to 16 TB)             │
│ Metal locker (fast)      │ gp3 (general purpose SSD)    │
│ Extra-fast titanium      │ io2 (provisioned IOPS SSD)  │
│   locker (expensive)     │                              │
│ Slow cardboard box       │ st1 (throughput optimized    │
│   (cheap, big)           │   HDD)                       │
│ Taking a photo of locker │ EBS Snapshot (backup to S3)  │
│   contents (backup)      │                              │
│ Moving locker to another │ Detach and reattach EBS      │
│   classroom              │   to another EC2             │
│ Locker encryption lock   │ EBS Encryption               │
│ Student's built-in desk  │ Instance Store (ephemeral)   │
│   (gone when student     │   (lost on stop/terminate)   │
│    leaves)               │                              │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**EBS (Elastic Block Store)** provides persistent block storage volumes for EC2 instances. Think of it like a network-attached hard drive. The EC2 instance communicates with the EBS volume over the network, but to the operating system, it appears as a regular disk drive.

A critical distinction is **EBS vs Instance Store**:
- **EBS**: Persistent. Data survives stops and terminations (if configured to not delete on termination). You can detach and reattach to another instance.
- **Instance Store**: Ephemeral. Physically attached to the host. Data is lost on stop or termination. Very fast, but temporary.

EBS volumes are replicated within an Availability Zone for high availability. They automatically protect you from hardware failure.

```
┌─────────────────────────────────────────────────────────┐
│                     EBS KEY FACTS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ EBS = Block storage volume for EC2                  │
│  ✅ Like a hard drive attached over network             │
│  ✅ Persists independently from EC2 instance            │
│  ✅ Can be detached from one EC2 and attached to        │
│     another (in the same AZ)                            │
│  ✅ Replicated within an AZ for durability              │
│  ✅ Sizes: 1 GB to 16 TB per volume                     │
│  ✅ Backed up via EBS Snapshots (stored in S3)          │
│  ✅ Can be encrypted at rest                            │
│  ✅ Root volume = OS volume, Data volume = extra disk   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ EBS Volume Types

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      EBS VOLUME TYPES                                   │
├───────────┬────────────┬───────────┬──────────────┬──────────────────────┤
│   TYPE    │  CATEGORY  │  MAX IOPS │ MAX THROUGHPUT│ USE CASE             │
├───────────┼────────────┼───────────┼──────────────┼──────────────────────┤
│   gp3     │  General    │ 16,000    │ 1,000 MB/s   │ Most workloads:      │
│           │  Purpose    │           │              │ web servers, dev     │
│           │  SSD        │           │              │ environments         │
├───────────┼────────────┼───────────┼──────────────┼──────────────────────┤
│   gp2     │  General    │ 16,000    │ 250 MB/s     │ Older gp, still ok   │
│           │  Purpose    │           │              │ for basic use        │
│           │  SSD        │           │              │                       │
├───────────┼────────────┼───────────┼──────────────┼──────────────────────┤
│   io2     │  Provisioned│ 256,000   │ 4,000 MB/s   │ Critical databases:  │
│           │  IOPS SSD   │           │              │ Oracle, SQL Server,   │
│           │             │           │              │ large workloads      │
├───────────┼────────────┼───────────┼──────────────┼──────────────────────┤
│   io1     │  Provisioned│ 64,000    │ 1,000 MB/s   │ Older io type        │
│           │  IOPS SSD   │           │              │                       │
├───────────┼────────────┼───────────┼──────────────┼──────────────────────┤
│   st1     │  Throughput│ 500       │ 500 MB/s     │ Big data, data       │
│           │  Optimized │           │              │ warehouses, log      │
│           │  HDD       │           │              │ processing           │
├───────────┼────────────┼───────────┼──────────────┼──────────────────────┤
│   sc1     │  Cold HDD  │ 250       │ 250 MB/s     │ Infrequent access,   │
│           │            │           │              │ lowest cost,         │
│           │            │           │              │ file servers         │
└───────────┴────────────┴───────────┴──────────────┴──────────────────────┘
```

**Key rule**: You can attach multiple EBS volumes to one EC2 instance, but each EBS volume can only be attached to ONE EC2 instance at a time (unless using multi-attach io2). For shared storage, use EFS (next chapter).

---

## 🔒 EBS Snapshots

A **snapshot** is a point-in-time backup of an EBS volume, stored in S3.

```
┌─────────────────────────────────────────────────────────┐
│                 EBS SNAPSHOT PROCESS                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. You have an EBS volume with data                    │
│                                                         │
│  2. You request a snapshot                              │
│     (immediate — first may take time)                   │
│                                                         │
│  3. AWS takes a point-in-time copy of the volume        │
│     and stores it in S3 (you don't see the S3 bucket)  │
│                                                         │
│  4. Subsequent snapshots are INCREMENTAL                │
│     — only changed blocks are saved                     │
│     (this saves storage space and money)               │
│                                                         │
│  5. You can create a new EBS volume from a snapshot     │
│     — in the same or different AZ/region               │
│                                                         │
│  6. You can copy snapshots across AWS regions           │
│     — useful for disaster recovery                     │
│                                                         │
│  School analogy: First snapshot = take photo of entire  │
│  locker contents. Next day's snapshot = only photo of   │
│  things that changed (new books added, old ones gone).  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Root Volume vs Data Volumes

Every EC2 instance has a **root volume** (the disk where the OS is installed) and can have additional **data volumes**.

```
┌─────────────────────────────────────────────────────────┐
│            ROOT VOLUME  vs  DATA VOLUME                 │
├──────────────────────────┬──────────────────────────────┤
│      ROOT VOLUME         │      DATA VOLUME             │
├──────────────────────────┼──────────────────────────────┤
│ Contains the OS          │ Contains application data    │
│ Boots the instance       │ or user files                │
│ Default: delete on       │ Default: persist             │
│ termination              │ after termination             │
│ Max 10 GB for Linux      │ Up to 16 TB each             │
│   (some exceptions)      │                              │
│ Can be EBS or Instance   │ Always EBS                   │
│   Store                  │                              │
│ School: Built-in desk    │ School: Extra storage locker │
│ drawer                   │                              │
└──────────────────────────┴──────────────────────────────┘
```

**Important exam tip:** By default, the root volume is set to "Delete on Termination." This means when you terminate the EC2 instance, the root volume is also deleted. For data volumes, this flag is OFF by default — they survive instance termination.

Always set "Delete on Termination" to OFF for root volumes if you want to preserve the OS disk after terminating the instance.

---

## 🧪 Hands-On Lab — Create and Attach an EBS Volume

```
STEP 1: Go to EC2 Console → Launch a t2.micro instance
        (Use any Linux AMI — Amazon Linux 2023 works)

STEP 2: Once the instance is running, go to:
        EC2 Console → Elastic Block Store → Volumes
        Click "Create volume"

STEP 3: Configure the volume:
        Volume type: gp3
        Size: 10 GB
        Availability Zone: MUST BE SAME as your EC2 instance
            (Check your EC2's AZ first!)
        Click "Create volume"

STEP 4: Attach the volume to your EC2:
        Select the new volume → Actions → Attach volume
        Instance: Select your running EC2 instance
        Device name: /dev/sdf (or xvdf for newer kernels)
        Click "Attach"

STEP 5: Connect to your EC2 via SSH:
        ssh -i "MyKeyPair.pem" ec2-user@<public-ip>

STEP 6: Format and mount the new volume inside the instance:
        # Check if the volume is visible
        lsblk
        # You should see xvdf (or nvme1n1)

        # Create a filesystem (first time only)
        sudo mkfs -t ext4 /dev/xvdf

        # Create a mount point
        sudo mkdir /mydata

        # Mount the volume
        sudo mount /dev/xvdf /mydata

        # Verify it is mounted
        df -h

STEP 7: Write a file to the new volume:
        echo "Hello from EBS!" | sudo tee /mydata/hello.txt
        cat /mydata/hello.txt

STEP 8: Create a snapshot:
        Go to EC2 Console → Volumes
        Select your volume → Actions → Create snapshot
        Description: MyFirstEBS-Snapshot
        Click "Create snapshot"

STEP 9: Verify the snapshot:
        EC2 Console → Elastic Block Store → Snapshots
        Status: pending → completed

✅ You have created, attached, formatted, and backed up
   an EBS volume!

STEP 10: (Optional) Clean up:
         Detach volume → Delete volume
         Delete snapshot
         Terminate EC2 instance
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always use gp3 as your default EBS type. It offers better performance than gp2 at a lower cost, and you only pay for the storage you provision (not baseline IOPS).

> 💡 **Tip 2:** Schedule regular EBS snapshots using Amazon Data Lifecycle Manager (DLM). Automate backups instead of doing them manually. DLM can also automatically delete old snapshots.

> 💡 **Tip 3:** For critical databases, use io2 volumes with Multi-Attach enabled for high-availability clustered setups. But remember — for most applications, gp3 is more than sufficient and much cheaper.

---

## ❓ Quick Quiz

**Question 1:** An EBS volume is created in us-east-1a. Can it be attached to an EC2 instance in us-east-1b?

```
A) Yes, any volume can attach to any instance
B) No, EBS volumes are AZ-specific
C) Yes, but only if both are in the same region
D) Yes, but performance will be reduced
```
**Answer: B** — EBS volumes are tied to their Availability Zone. A volume in us-east-1a can only be attached to instances in us-east-1a. To move it, create a snapshot and restore it in the destination AZ.

---

**Question 2:** What happens to the root EBS volume when you terminate an EC2 instance by default?

```
A) It persists and you continue to pay for it
B) It is deleted along with the instance
C) It is automatically detached and saved
D) It is converted into an AMI
```
**Answer: B** — By default, the "Delete on Termination" flag is enabled for root volumes. When the EC2 instance is terminated, the root volume is deleted. Always check this setting if you want to preserve data.

---

## 🎤 Interview Questions

**Q: What is EBS and how does it differ from Instance Store?**

> EBS (Elastic Block Store) provides persistent block storage volumes that can be attached to EC2 instances. EBS volumes persist independently from the instance — data survives stops and terminations. Instance Store, on the other hand, provides temporary block-level storage physically attached to the host machine. Instance Store is faster (local) but data is lost when the instance is stopped or terminated. EBS is network-attached but durable and can be backed up with snapshots.

**Q: Explain EBS Snapshots — what are they and what makes them cost-effective?**

> An EBS Snapshot is a point-in-time backup of an EBS volume, stored in S3. The first snapshot is a full copy of the volume. All subsequent snapshots are incremental — they only save the blocks that have changed since the last snapshot. This makes snapshots very cost-effective because you are not duplicating data each time. You can restore a volume from any snapshot, copy snapshots across regions for disaster recovery, and share snapshots with other AWS accounts.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 14 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ EBS = Persistent block storage for EC2              │
│  ✅ Like a student's personal locker — private storage │
│  ✅ EBS volumes are AZ-specific                         │
│  ✅ Types: gp3 (general), io2 (high perf),             │
│     st1 (throughput), sc1 (cold)                        │
│  ✅ Root volume = OS (deleted by default on terminate) │
│  ✅ Data volumes = extra storage (persist by default)   │
│  ✅ Snapshots = incremental backups stored in S3       │
│  ✅ Instance Store = fast but temporary (ephemeral)     │
│  ✅ One EBS volume → one EC2 instance at a time         │
│  ✅ gp3 is the best default choice                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
