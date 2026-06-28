# CHAPTER 16
# S3 — Simple Storage Service

---

## 📖 Story First

The school has evolved. Lockers (EBS) are for personal storage. The library (EFS) is for shared files between classrooms. But the school has a bigger problem now.

The school produces a massive amount of data every year:
- Student admission records going back decades
- Exam papers and answer sheets
- Photos from every school event
- CCTV footage from the security cameras
- Teacher employment records
- The school's newsletter archives (since 1985)
- Backups of the school's computer systems

All of this data cannot fit in lockers. It cannot all fit in the library either. The school needs a **central document archive** — a massive, secure, permanent storage facility where records are stored forever and can be retrieved whenever needed.

This central archive has some amazing properties:
- It has **unlimited space** — you never need to add more shelves
- It is **incredibly durable** — documents stored here will survive fire, flood, or earthquake with 99.999999999% certainty
- You can **store any type of file** — paper documents, photos, videos, backups
- You can **access files from anywhere** — any building, any city, any device
- When you put a document in, you get back a **unique reference number** to retrieve it later

This is **Amazon S3 (Simple Storage Service)** .

S3 is AWS's object storage service. It is not a hard drive attached to a computer (EBS) and it is not a shared file system (EFS). It is a completely different paradigm — a virtually unlimited storage space for any type of data, accessible from anywhere over the internet.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what S3 is and the bucket/object model
- ✅ Understand S3's durability and availability guarantees
- ✅ Choose the right storage class for different data
- ✅ Configure versioning and lifecycle rules
- ✅ Host a static website on S3

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│               SCHOOL  ←→  S3 MAPPING                    │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Central document archive │ S3 Bucket                    │
│ A document in the archive│ S3 Object                    │
│ Document's reference     │ S3 Object Key (filename)     │
│   number + filing cabinet │                              │
│ Document contents        │ S3 Object Data (body)        │
│ Document metadata        │ S3 Object Metadata           │
│ (date filed, author, etc)│ (content-type, tags, etc)    │
│ Archive room name        │ Bucket Name (globally unique)│
│   (unique across entire  │                              │
│    school district)      │                              │
│ Unlimited archive space  │ Unlimited S3 storage          │
│ Document copies          │ S3 Versioning                 │
│ (original + revisions)   │                              │
│ Old documents moved to   │ S3 Lifecycle Rules            │
│   basement after 5 years │   (move to Glacier)          │
│ Public notice board      │ S3 Static Website Hosting    │
│ Document shredded after  │ Lifecycle: Expire/Delete     │
│   10 years               │                              │
│ Student's personal locker│ EBS (block storage)          │
│   (Chapter 14)           │                              │
│ School library (Chapter  │ EFS (file storage)           │
│   15)                    │                              │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**Amazon S3 (Simple Storage Service)** is a fully managed object storage service. Data is stored as **objects** inside **buckets**. Each object consists of data (the file contents), a key (the filename/path), and metadata.

S3 is not a filesystem. You do not mount it like a drive. Instead, you interact with it via API calls over HTTP/HTTPS. This makes S3 accessible from anywhere — from EC2 instances, from Lambda functions, from your laptop, from a mobile app.

### Buckets and Objects

```
┌─────────────────────────────────────────────────────────┐
│                   S3 BUCKET & OBJECT                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  BUCKET:                                                │
│  - A container for objects                              │
│  - Globally unique name (across ALL AWS accounts)       │
│  - Created in a specific region                         │
│  - Up to 100 buckets per account (soft limit)           │
│                                                         │
│  Example bucket name: my-school-archive-2024            │
│                                                         │
│  OBJECT:                                                │
│  - The actual file/data                                 │
│  - Has a Key (name/path) like: /admissions/2024/        │
│    student-roster.csv                                   │
│  - Has metadata (content-type, size, last-modified)     │
│  - Size: 0 bytes to 5 TB per object                    │
│  - Total: unlimited objects per bucket                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                     S3 KEY FACTS                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ S3 = Object storage (not block, not file)           │
│  ✅ Unlimited storage — store as much as you want       │
│  ✅ 99.999999999% durability (11 9's)                   │
│  ✅ Buckets store objects                               │
│  ✅ Objects consist of: Key (name) + Data + Metadata   │
│  ✅ Bucket names are GLOBALLY unique                    │
│  ✅ Objects are accessed via URL/API (not mounted)      │
│  ✅ Maximum object size: 5 TB                           │
│  ✅ 6 storage classes for different access patterns     │
│  ✅ Supports versioning, encryption, access control     │
│  ✅ Can host static websites                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ S3 Storage Classes

Different data has different access patterns. S3 offers multiple storage classes:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          S3 STORAGE CLASSES                                    │
├──────────────────┬────────────┬─────────────────┬──────────────────────────────┤
│   STORAGE CLASS  │ DURABILITY │  AVAILABILITY    │  USE CASE                    │
├──────────────────┼────────────┼─────────────────┼──────────────────────────────┤
│ S3 Standard      │ 99.9999999%│ 99.99%           │ Frequently accessed data     │
│                  │            │                  │ Website content, images,    │
│                  │            │                  │ active files                │
├──────────────────┼────────────┼─────────────────┼──────────────────────────────┤
│ S3 Intelligent   │ 99.9999999%│ 99.99%           │ Unknown access patterns     │
│ Tiering          │            │                  │ Auto-moves data between     │
│                  │            │                  │ tiers based on usage         │
├──────────────────┼────────────┼─────────────────┼──────────────────────────────┤
│ S3 Standard-IA   │ 99.9999999%│ 99.9%            │ Infrequent but important    │
│ (Infrequent      │            │                  │ Old data, backups,          │
│  Access)         │            │                  │ disaster recovery files      │
├──────────────────┼────────────┼─────────────────┼──────────────────────────────┤
│ S3 One Zone-IA   │ 99.9999999%│ 99.5%            │ Recreatable data            │
│                  │            │                  │ (lost if AZ fails)          │
│                  │            │                  │ Lower cost                   │
├──────────────────┼────────────┼─────────────────┼──────────────────────────────┤
│ S3 Glacier       │ 99.9999999%│ 99.99%           │ Archival data               │
│                  │            │                  │ Retrieval: minutes to hours │
│                  │            │                  │ Lowest cost for archives    │
├──────────────────┼────────────┼─────────────────┼──────────────────────────────┤
│ S3 Glacier Deep  │ 99.9999999%│ 99.99%           │ Long-term archives          │
│ Archive          │            │                  │ Retrieval: 12-48 hours      │
│                  │            │                  │ Absolute lowest cost        │
└──────────────────┴────────────┴─────────────────┴──────────────────────────────┘
```

**School analogy for storage classes:**
- **Standard** = Books on the library's main shelf (grab anytime)
- **Intelligent Tiering** = Librarian auto-decides where each book goes
- **Standard-IA** = Books in the back room (still get them quickly, but less costly to store)
- **One Zone-IA** = Books in one classroom closet (cheap, but fire in that room = lost books)
- **Glacier** = Books in the university's deep storage (takes a day to retrieve, very cheap)
- **Glacier Deep Archive** = Books in a cave somewhere (takes 2 days, practically free)

---

## 🔄 Versioning

S3 Versioning is a feature that keeps multiple versions of an object in the same bucket.

```
┌─────────────────────────────────────────────────────────┐
│                  S3 VERSIONING                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  WITHOUT Versioning:                                    │
│  Upload "report.pdf" → overwrites previous version      │
│  Old version is gone FOREVER — no recovery possible     │
│                                                         │
│  WITH Versioning:                                       │
│  Upload "report.pdf" v1 → kept                          │
│  Upload "report.pdf" v2 → BOTH versions are kept       │
│  Upload "report.pdf" v3 → ALL THREE versions kept       │
│                                                         │
│  You can:                                               │
│  - View all versions of an object                       │
│  - Restore any previous version                         │
│  - Permanently delete specific versions                 │
│                                                         │
│  Once enabled, versioning CANNOT be disabled —          │
│  only suspended (existing versions remain)              │
│                                                         │
│  School analogy:                                        │
│  Without versioning: writing on a whiteboard and        │
│    erasing — previous content is gone                   │
│  With versioning: saving every draft of an essay —      │
│    you can always go back to Draft 1                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ⏰ Lifecycle Rules

Lifecycle rules automatically transition objects between storage classes or delete them after a specified time.

```
┌─────────────────────────────────────────────────────────┐
│              S3 LIFECYCLE RULE EXAMPLE                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Rule: "Move old data to Glacier and delete after 5 yrs"│
│                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────┐ │
│  │  S3 Standard  │───>│ S3 Glacier   │───>│  Delete   │ │
│  │  (0-30 days)  │    │ (30-365 days)│    │ (after 365)│ │
│  └──────────────┘    └──────────────┘    └───────────┘ │
│                                                         │
│  School analogy:                                        │
│  - File created → on main shelf (Standard)             │
│  - After 30 days → moved to back room (IA)             │
│  - After 365 days → moved to archive (Glacier)         │
│  - After 5 years → shredded (deleted)                  │
│                                                         │
│  Why use lifecycle rules?                               │
│  → Automate data management                             │
│  → Reduce costs (don't pay Standard prices for old data)│
│  → Meet compliance requirements (auto-delete after X    │
│     years)                                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🌐 Static Website Hosting

S3 can host static websites (HTML, CSS, JavaScript, images — no server-side code).

```
┌─────────────────────────────────────────────────────────┐
│              S3 STATIC WEBSITE HOSTING                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Create a bucket (name = your domain name)           │
│                                                         │
│  2. Enable "Static website hosting"                     │
│     - Set index document: index.html                    │
│     - Set error document: error.html                    │
│                                                         │
│  3. Make bucket contents PUBLIC (via Bucket Policy)    │
│                                                         │
│  4. Upload your website files (HTML, CSS, JS, images)   │
│                                                         │
│  5. Access your site at the S3 endpoint URL:            │
│     http://<bucket-name>.s3-website-<region>.amazonaws. │
│     com                                                  │
│                                                         │
│  School analogy: A public notice board in the school    │
│  entrance. Anyone walking by can read it. Anyone can    │
│  see school announcements. No server is running — it   │
│  is just static pages served from S3.                   │
│                                                         │
│  LIMITATION: Static content only. No PHP, Python,       │
│  or server-side applications. Use EC2 or Lambda for     │
│  dynamic content.                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Hands-On Lab — S3 Bucket Operations

```
STEP 1: Go to S3 Console → Create bucket:
        Bucket name: my-school-bucket-<your-unique-id>
        (Must be globally unique! Try adding your birth year
         or initials: my-school-bucket-1990)
        Region: us-east-1 (or closest to you)
        Block all public access: KEEP ENABLED (for now)
        Click "Create bucket"

STEP 2: Upload an object:
        Click on your bucket name
        Click "Upload" → "Add files"
        Select any small file on your computer (a photo, PDF, 
        or text file)
        Click "Upload"

STEP 3: View the object properties:
        Click on the uploaded file
        Notice:
        - Object URL (the web address of your file)
        - ETag (checksum — for integrity verification)
        - Size
        - Storage class (Standard)
        - Metadata

STEP 4: Enable Versioning on the bucket:
        Go back to bucket → Properties tab
        Bucket Versioning → Edit → Enable → Save

STEP 5: Upload a new version of the same file:
        Upload the same file again (or rename a copy)
        Notice: now there are TWO versions of the file
        Click "Show versions" to see both

STEP 6: Restore the original version:
        Click the original version
        Actions → Download (save the original)
        Actions → Delete (if you want)
        Or simply download the version you want

STEP 7: Enable Static Website Hosting:
        Create a NEW bucket (call it my-website-<unique-id>)
        Properties → Static website hosting → Enable
        Index document: index.html
        Error document: error.html

STEP 8: Create a simple index.html on your computer:
        echo "<html><body><h1>Hello from S3!</h1>
        </body></html>" > index.html
        echo "<html><body><h1>Error - Page not found
        </h1></body></html>" > error.html

STEP 9: Upload the HTML files to your website bucket:
        Upload index.html and error.html

STEP 10: Make the bucket public:
         Permissions → Bucket Policy
         Paste this policy:
         {
           "Version": "2012-10-17",
           "Statement": [
             {
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::my-website-<unique-id>/*"
             }
           ]
         }
         Click "Save"

STEP 11: Access your website:
         Properties → Static website hosting
         Copy the "Bucket website endpoint" URL
         Paste in your browser

         ✅ Your static website is LIVE on S3!

STEP 12: (Optional) Clean up:
         Empty both buckets (delete all objects/versions)
         Delete both buckets
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** S3 bucket names are globally unique across ALL AWS accounts. If you try to create a bucket named "documents" and someone else already has it, you will get an error. Use prefixes like your company name: "acme-documents-2024".

> 💡 **Tip 2:** Enable S3 Versioning for all important buckets — especially those with critical data. The small cost is worth the insurance. Without versioning, an accidental overwrite or delete is permanent.

> 💡 **Tip 3:** Use S3 Lifecycle Rules to automatically transition data to cheaper storage classes. You can save up to 80% on storage costs by moving old data to Glacier. Set a rule on day 1 — you cannot retroactively apply it.

> 💡 **Tip 4:** NEVER make S3 buckets public unless absolutely necessary. Use pre-signed URLs for temporary access (e.g., a download link that expires in 1 hour) instead of making objects publicly readable.

---

## ❓ Quick Quiz

**Question 1:** You need to store CCTV footage that must be kept for 7 years. The footage will almost never be accessed after the first month. Which storage strategy is BEST?

```
A) Store everything in S3 Standard
B) Store in S3 Standard, use lifecycle rule to move to
   Glacier after 30 days, delete after 7 years
C) Store on an EC2 instance's EBS volume
D) Store in EFS
```
**Answer: B** — Lifecycle rules allow automatic transition to cheaper storage (Glacier) for old data, with automatic deletion after the retention period. This minimizes cost while meeting compliance.

---

**Question 2:** A user accidentally overwrites a critical file in S3. What feature allows recovery?

```
A) Recycle Bin
B) S3 Versioning (if enabled)
C) S3 Lifecycle Rules
D) S3 Glacier
```
**Answer: B** — S3 Versioning keeps all versions of an object. If enabled, you can restore the previous version. Without versioning, the overwrite is permanent.

---

## 🎤 Interview Questions

**Q: What is S3 and how does it differ from EBS and EFS?**

> S3 is object storage — data is stored as objects in buckets, accessed via API/HTTP. EBS is block storage — a virtual hard drive attached to a single EC2 instance. EFS is file storage — a shared NFS filesystem for multiple EC2 instances. Key differences: S3 has unlimited storage, 99.999999999% durability, accessible from anywhere (not just EC2), supports versioning, and offers multiple storage classes. EBS and EFS are accessed as mounted drives; S3 is accessed via API calls.

**Q: Explain S3 Storage Classes and when you would use each?**

> S3 offers six storage classes optimized for different access patterns. S3 Standard is for frequently accessed data. S3 Intelligent-Tiering automatically optimizes costs for unknown patterns. S3 Standard-IA is for important but infrequently accessed data. S3 One Zone-IA is for recreatable data that can tolerate an AZ failure. S3 Glacier is for archival data retrieved occasionally (minutes to hours). S3 Glacier Deep Archive is for long-term retention where retrieval in 12-48 hours is acceptable. I would use lifecycle policies to transition data between classes automatically.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 16 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ S3 = Object storage — store files as objects        │
│     in buckets                                          │
│  ✅ Like a school's central document archive            │
│  ✅ Unlimited storage with 99.999999999% durability    │
│  ✅ Bucket names are GLOBALLY unique across all AWS     │
│  ✅ Objects consist of Key (name) + Data + Metadata    │
│  ✅ 6 storage classes: Standard, Intelligent Tiering,   │
│     Standard-IA, One Zone-IA, Glacier, Glacier Deep     │
│     Archive                                             │
│  ✅ Versioning keeps multiple object versions —         │
│     enables recovery from accidental overwrites         │
│  ✅ Lifecycle Rules automate transitions between        │
│     storage classes                                     │
│  ✅ Can host static websites (HTML/CSS/JS)              │
│  ✅ Accessed via API/URL — not mounted as a drive       │
│  ✅ S3 ≠ EBS (block) ≠ EFS (file) — different purposes │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
