# CHAPTER 15
# EFS — Elastic File System

---

## 📖 Story First

Remember the student's personal locker from the last chapter?

That locker is great — but it only belongs to one student. If Student A is using the locker, Student B cannot access it. If Student A moves to a different building, the locker stays behind and Student A no longer has access.

But the school library is different.

The school library is a shared space. Any student can walk in, pick up a book, read it, and put it back. Another student can pick up the exact same book simultaneously (digital books, of course). Teachers can access the same books from their offices. Even the Principal can browse the same collection.

The library lives in its own building — it is not attached to any specific classroom or student. Every classroom, every building on campus can access the same library, as long as they have the right network path.

Multiple students from different classrooms can all read from the same library books at the same time. If a teacher adds a new book to the library, every student across the entire campus can see it immediately — no need to copy it to each locker.

This shared, accessible-from-anywhere, concurrent-access storage is exactly what **EFS (Elastic File System)** provides in AWS.

EFS is a fully managed, scalable, shared file system that multiple EC2 instances can mount and access at the same time — even across different Availability Zones.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what EFS is and how it differs from EBS
- ✅ Understand EFS performance and throughput modes
- ✅ Configure EFS lifecycle management for cost savings
- ✅ Mount an EFS file system on multiple EC2 instances

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│              SCHOOL  ←→  EFS MAPPING                    │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ School library           │ EFS File System              │
│ Library building         │ EFS (network file storage)   │
│ Students read same book  │ Multiple EC2 read same file  │
│   at same time           │   concurrently               │
│ Library accessible from │ EFS accessible across AZs    │
│   all campus buildings   │   in the same VPC region     │
│ Add a book → everyone    │ Write file → all instances   │
│   sees it immediately     │   see it (no copying needed)│
│ Librarian manages        │ AWS manages EFS              │
│   (fully managed)        │   (no server admin)         │
│ Library grows as more    │ EFS scales automatically     │
│   books are added        │   (pay for what you use)     │
│ Personal locker (previous│ EBS (block storage,          │
│   chapter)               │   single-attach)            │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**EFS (Elastic File System)** is a fully managed, scalable, shared file storage service for use with AWS EC2 instances. It implements the NFSv4 (Network File System) protocol.

EFS is designed for scenarios where multiple EC2 instances need to read from and write to the same files simultaneously. This is common in:
- Web server farms sharing the same codebase or content
- Content management systems
- Media processing workflows
- Development environments sharing code repositories

EFS automatically grows and shrinks as you add and remove files — there is no provisioning needed. You pay only for the storage you use (per-gigabyte-month).

```
┌─────────────────────────────────────────────────────────┐
│                     EFS KEY FACTS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ EFS = Fully managed NFS file system for EC2         │
│  ✅ Multiple EC2 instances can mount simultaneously     │
│  ✅ Accessible across all AZs in the same VPC region   │
│  ✅ Automatically scales — no provisioning needed       │
│  ✅ Pay only for what you use (no pre-provisioning)     │
│  ✅ Supports NFSv4 protocol                             │
│  ✅ Can be accessed from on-premises via VPN/Direct     │
│     Connect                                             │
│  ✅ Two performance modes: General Purpose, Max I/O    │
│  ✅ Two throughput modes: Bursting, Provisioned        │
│  ✅ Lifecycle management moves old files to Infrequent │
│     Access (IA) tier to save costs                     │
│  ✅ EFS vs EBS: EBS = one locker; EFS = shared library │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ⚡ EFS Performance and Throughput Modes

### Performance Modes

```
┌─────────────────────────────────────────────────────────────┐
│                  EFS PERFORMANCE MODES                      │
├───────────────────────┬─────────────────────────────────────┤
│       MODE            │  USE CASE                            │
├───────────────────────┼─────────────────────────────────────┤
│ General Purpose       │ Default — lowest latency            │
│                       │ Best for: web servers, CMS,        │
│                       │ general file sharing               │
│                       │ Latency: low (single-digit ms)      │
├───────────────────────┼─────────────────────────────────────┤
│ Max I/O               │ Higher latency but massively       │
│                       │ scalable throughput                 │
│                       │ Best for: big data, media           │
│                       │ processing, high-throughput         │
│                       │ workloads                           │
│                       │ Can scale to thousands of EC2       │
│                       │ instances accessing simultaneously  │
└───────────────────────┴─────────────────────────────────────┘
```

### Throughput Modes

```
┌─────────────────────────────────────────────────────────────┐
│                  EFS THROUGHPUT MODES                       │
├───────────────────────┬─────────────────────────────────────┤
│       MODE            │  DESCRIPTION                         │
├───────────────────────┼─────────────────────────────────────┤
│ Bursting              │ Default — throughput scales with     │
│                       │ storage size                        │
│                       │ 50 MB/s per TB of storage           │
│                       │ Can burst to higher throughput      │
│                       │ Good for variable workloads         │
├───────────────────────┼─────────────────────────────────────┤
│ Provisioned           │ Set a fixed throughput regardless   │
│                       │ of storage size                     │
│                       │ Range: 1 MB/s to 10 GB/s           │
│                       │ Good for consistent, high-throughput│
│                       │ workloads with small datasets       │
└───────────────────────┴─────────────────────────────────────┘
```

---

## 💰 EFS Infrequent Access (EFS IA) and Lifecycle Management

EFS offers a cost-saving feature called **Lifecycle Management**.

```
┌─────────────────────────────────────────────────────────┐
│           EFS STORAGE CLASSES & LIFECYCLE               │
├──────────────────────────┬──────────────────────────────┤
│     STORAGE CLASS        │      COST PROFILE            │
├──────────────────────────┼──────────────────────────────┤
│ Standard                 │ Higher cost per GB           │
│                          │ Lowest access latency        │
│                          │ For frequently accessed files │
├──────────────────────────┼──────────────────────────────┤
│ Infrequent Access (IA)   │ Lower cost per GB            │
│                          │ Slightly higher latency      │
│                          │ For files accessed < 1x/month│
└──────────────────────────┴──────────────────────────────┘
```

**Lifecycle Policy**: Automatically moves files from Standard to IA after N days of not being accessed (e.g., 30, 60, 90 days).

**School analogy**: 
- Standard tier = books on the main library shelves (easy to grab, more costly to maintain)
- IA tier = books in the basement storage (cheaper, takes a few minutes to retrieve)
- Lifecycle policy = librarian automatically moves books to the basement after 30 days of nobody reading them

---

## 🧪 Hands-On Lab — Create and Mount an EFS File System

```
PREREQUISITES:
- VPC with at least 2 subnets in different AZs
- 2 EC2 instances (t2.micro) in different subnets
- Security Group allowing NFS (port 2049) traffic
  between the instances (or from the EFS SG)

STEP 1: Create an EFS file system:
        Go to EFS Console → Create file system
        Name: MySharedLibrary
        VPC: Select your VPC
        Click "Create"

STEP 2: Configure mount targets:
        EFS automatically creates mount targets in
        each subnet in your VPC
        Check: One mount target per AZ
        (EFS uses mount targets to be accessible across AZs)

STEP 3: Note the EFS File System ID:
        Looks like: fs-0abcdef1234567890
        You will need this for mounting

STEP 4: Connect to your FIRST EC2 instance via SSH:
        ssh -i "MyKeyPair.pem" ec2-user@<first-public-ip>

STEP 5: Install NFS client on the first instance:
        sudo yum update -y
        sudo yum install -y nfs-utils

STEP 6: Create a mount point and mount EFS:
        sudo mkdir /shared
        sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,\
          wsize=1048576,hard,timeo=600,retrans=2,noresvport \
          <fs-id>.efs.<region>.amazonaws.com:/ /shared

        Replace <fs-id> with your EFS file system ID
        Replace <region> with your AWS region (e.g., us-east-1)

STEP 7: Verify the mount:
        df -h
        You should see your EFS mount at /shared

STEP 8: Write a file on the first instance:
        echo "Hello from EC2 Instance 1!" | \
          sudo tee /shared/greeting.txt
        cat /shared/greeting.txt

STEP 9: Connect to your SECOND EC2 instance via SSH:
        (In a different terminal window)
        ssh -i "MyKeyPair.pem" ec2-user@<second-public-ip>

STEP 10: Same steps on the second instance:
         sudo yum install -y nfs-utils
         sudo mkdir /shared
         sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,\
           wsize=1048576,hard,timeo=600,retrans=2,noresvport \
           <fs-id>.efs.<region>.amazonaws.com:/ /shared

STEP 11: Read the file from the second instance:
         cat /shared/greeting.txt
         # Output: "Hello from EC2 Instance 1!"

         Now write another file:
         echo "Hello back from EC2 Instance 2!" | \
           sudo tee /shared/response.txt

STEP 12: Go back to the first instance:
         cat /shared/response.txt
         # Output: "Hello back from EC2 Instance 2!"

✅ Both EC2 instances share the same EFS file system!
   Files written from one instance are immediately
   visible on the other instance — no copying needed.

STEP 13: (Optional) Make the mount persistent:
         Add to /etc/fstab:
         echo "<fs-id>.efs.<region>.amazonaws.com:/ /shared \
           nfs4 nfsvers=4.1,rsize=1048576,wsize=1048576,\
           hard,timeo=600,retrans=2,noresvport,_netdev 0 0" \
           | sudo tee -a /etc/fstab
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Use General Purpose performance mode for most workloads. Only use Max I/O if you need massive parallel throughput and can tolerate higher latency. Switching modes after creation is not possible — choose carefully at creation time.

> 💡 **Tip 2:** Enable lifecycle management to move files that have not been accessed in 30 days to the EFS IA storage class. This can reduce storage costs by up to 90% for infrequently accessed data.

> 💡 **Tip 3:** EFS security is controlled via Security Groups and IAM policies. Create a dedicated Security Group for EFS that allows inbound NFS (port 2049) from your application instances' Security Groups — never from 0.0.0.0/0.

---

## ❓ Quick Quiz

**Question 1:** You have a web application with 10 EC2 instances that all need to read and write the same files. Which storage solution is BEST?

```
A) EBS with one volume attached to each instance
B) EFS (shared file system)
C) Instance Store on each instance
D) A single EBS volume attached to one instance,
   other instances SSH to that instance
```
**Answer: B** — EFS is designed for exactly this scenario: multiple EC2 instances sharing the same file system simultaneously across AZs.

---

**Question 2:** How does EFS differ from EBS in terms of availability across Availability Zones?

```
A) EBS can be accessed across AZs; EFS cannot
B) EFS is accessible across AZs; EBS is tied to one AZ
C) Both are accessible across AZs
D) Neither is accessible across AZs
```
**Answer: B** — EFS can be mounted from EC2 instances in any AZ within the same VPC region (via mount targets in each AZ). EBS volumes are tied to the specific AZ they were created in.

---

## 🎤 Interview Questions

**Q: Explain the difference between EBS and EFS. When would you use each?**

> EBS (Elastic Block Store) provides block-level storage volumes that can be attached to a single EC2 instance at a time. It is like a hard drive — fast, low latency, but exclusive to one instance. EBS is best for databases, boot volumes, and applications that need dedicated storage. EFS (Elastic File System) provides a shared NFS file system that multiple EC2 instances can mount simultaneously across different Availability Zones. EFS is best for content management systems, web server farms sharing code, and any workload requiring shared, concurrent file access. EBS is AZ-specific; EFS works across all AZs in a region.

**Q: What are EFS Lifecycle Policies and why are they useful?**

> EFS Lifecycle Policies automatically move files from the Standard storage class to the Infrequent Access (IA) storage class after a specified number of days without access. This is useful for cost optimization — the IA class costs significantly less per GB than Standard. For example, I can set a policy that moves files not accessed in 30 days to IA, automatically reducing storage costs for old data while still keeping it accessible with slightly higher latency.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 15 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ EFS = Shared file system for multiple EC2 instances │
│  ✅ Like a school library — accessible from anywhere    │
│  ✅ Uses NFSv4 protocol                                 │
│  ✅ Works across ALL Availability Zones in the region   │
│  ✅ Automatically scales — no capacity planning needed   │
│  ✅ Pay only for storage used (per GB-month)            │
│  ✅ Performance modes: General Purpose, Max I/O         │
│  ✅ Throughput modes: Bursting, Provisioned             │
│  ✅ Lifecycle management moves old files to IA tier    │
│  ✅ EFS = shared; EBS = single-attach block storage     │
│  ✅ Security via Security Groups (port 2049/NFS)        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
