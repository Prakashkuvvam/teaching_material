---
title: "Chapter 17 — IAM — Identity & Access Management"
sidebar_position: 17
description: "By the end of this chapter, you will be able to: Explain what IAM is and why it matters"
---

---

## 📖 Story First

The school is now fully operational. Buildings are up, students are in classrooms, and everything is running smoothly.

But one day, the school realizes something dangerous.

Every person in the school — students, teachers, cleaning staff, canteen workers, security guards — all have the same ID card.

With this card, everyone can:
- Enter the Principal's office
- Access the examination paper vault
- Change the school's financial records
- Fire teachers

This is an absolute disaster waiting to happen.

The school quickly sets up a proper **Identity Management System**:

- **Students** get an ID that allows them: enter their classrooms, visit library, use canteen
- **Teachers** get an ID that allows them: enter classrooms, access teacher portal, view student grades
- **Principal** gets an ID that allows them: everything
- **Cleaning Staff** get an ID that allows them: enter all rooms after 6 PM only, no access to office computers

Every person has an identity. And every identity has specific permissions. Nothing more, nothing less.

**This is IAM in AWS.**

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what IAM is and why it matters
- ✅ Understand IAM Users, Groups, Roles, and Policies
- ✅ Apply the Principle of Least Privilege
- ✅ Create IAM Users and attach policies
- ✅ Understand the difference between Users and Roles

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│              SCHOOL  ←→  IAM MAPPING                   │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ School Management System │ IAM (Identity & Access Mgmt) │
│ Person (student/teacher) │ IAM User                     │
│ Department (Science Dept)│ IAM Group                    │
│ Permission slip          │ IAM Policy                   │
│ Temporary visitor badge  │ IAM Role                     │
│ School rules book        │ IAM Policy Document (JSON)   │
│ Principal (full access)  │ Root Account                 │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Four IAM Components

```
┌─────────────────────────────────────────────────────────────┐
│                    IAM COMPONENTS                           │
├──────────────┬──────────────────────────────────────────────┤
│  COMPONENT   │  DESCRIPTION                                 │
├──────────────┼──────────────────────────────────────────────┤
│  IAM User    │ A person or application that needs access    │
│              │ to AWS. Has username and password (or        │
│              │ access keys for programmatic access)         │
├──────────────┼──────────────────────────────────────────────┤
│  IAM Group   │ A collection of IAM Users. You attach        │
│              │ policies to groups, not individual users.    │
│              │ Makes it easy to manage permissions for      │
│              │ teams (Developers, Admins, etc.)             │
├──────────────┼──────────────────────────────────────────────┤
│  IAM Policy  │ A JSON document that defines permissions.   │
│              │ Specifies: what actions, on what resources,  │
│              │ under what conditions.                       │
├──────────────┼──────────────────────────────────────────────┤
│  IAM Role    │ A set of permissions that can be assumed     │
│              │ temporarily by users, services, or apps.    │
│              │ Like a visitor badge — temporary access.    │
└──────────────┴──────────────────────────────────────────────┘
```

---

## 📄 IAM Policy — What Does It Look Like?

A Policy is a JSON document. It is the actual definition of permissions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-school-bucket/*"
    }
  ]
}
```

Reading this in plain English:

```
"Allow the user to GET and PUT objects
 inside the S3 bucket named 'my-school-bucket'"
```

Key parts of a Policy:

```
┌─────────────────────────────────────────────────────────┐
│                 IAM POLICY STRUCTURE                    │
├───────────────┬─────────────────────────────────────────┤
│  ELEMENT      │  MEANING                                │
├───────────────┼─────────────────────────────────────────┤
│  Effect       │ "Allow" or "Deny"                       │
│  Action       │ What can be done (s3:GetObject, etc.)   │
│  Resource     │ What resource it applies to (ARN)       │
│  Condition    │ Optional: extra conditions               │
│               │ (e.g., "only if MFA is enabled")        │
└───────────────┴─────────────────────────────────────────┘
```

---

## 👤 IAM User vs IAM Role

This is a very common interview question.

```
┌─────────────────────────────────────────────────────────┐
│              IAM USER  vs  IAM ROLE                     │
├──────────────────────────┬──────────────────────────────┤
│      IAM USER            │      IAM ROLE                │
├──────────────────────────┼──────────────────────────────┤
│ For a SPECIFIC person    │ For a SPECIFIC job/task      │
│ or application           │ that anyone can assume       │
│                          │                             │
│ Permanent credentials    │ Temporary credentials        │
│ (username/password       │ (auto-expires)               │
│ or access keys)          │                             │
│                          │                             │
│ "This is Rahul's account"│ "This is the EC2 Admin role  │
│                          │  — any approved EC2 can use  │
│                          │  it"                        │
│                          │                             │
│ School: Permanent student│ School: Temporary visitor   │
│ ID card                  │ badge for that day's visit  │
└──────────────────────────┴──────────────────────────────┘
```

**Key use case for Roles:** When an EC2 instance needs to access an S3 bucket, you do NOT give it a username and password. You assign an IAM Role to the EC2 instance. The EC2 assumes the role and gets temporary permissions automatically.

---

## ⚠️ The Root Account — Handle With Care

```
┌─────────────────────────────────────────────────────────┐
│                   ROOT ACCOUNT WARNING                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  The Root account is like the school OWNER.            │
│  It has UNLIMITED power. It can delete everything.     │
│  It cannot be restricted by policies.                  │
│                                                         │
│  ⚠️  NEVER use Root account for daily tasks            │
│  ⚠️  Enable MFA (Multi-Factor Auth) on Root immediately│
│  ⚠️  Only use Root for billing and account-level tasks │
│  ⚠️  Create IAM Admin User and use that instead        │
│                                                         │
│  This is a real exam question and job interview topic!  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Principle of Least Privilege

The most important security principle in IAM:

> **Give users ONLY the permissions they absolutely need. Nothing more.**

```
BAD EXAMPLE:
Developer Rahul needs to read one S3 bucket.
You give him: "AdministratorAccess" policy
→ Rahul now has access to ALL AWS services. 
→ If Rahul's account is compromised, attacker 
  has access to EVERYTHING.

GOOD EXAMPLE:
Developer Rahul needs to read one S3 bucket.
You give him: Read access to ONLY that specific bucket.
→ Even if compromised, attacker can only read that bucket.
→ Everything else is safe.
```

---

## 🧪 Hands-On Lab — Create an IAM User

```
STEP 1: Go to IAM Console (search "IAM" in AWS console)

STEP 2: Create a Group first:
        IAM → User groups → Create group
        Group name: Developers
        Attach policy: AmazonEC2ReadOnlyAccess
        Click "Create group"

STEP 3: Create a User:
        IAM → Users → Create user
        Username: rahul-developer
        
STEP 4: Set Permissions:
        "Add user to group"
        Select: Developers
        Click "Next" → "Create user"

STEP 5: Create Access Credentials:
        Click on rahul-developer
        Security credentials tab
        Click "Enable console access"
        Set a password
        
STEP 6: Download credentials CSV (save it safely!)

STEP 7: Enable MFA for Root account:
        IAM → Root account (top right)
        Security credentials → MFA → Activate MFA
        Use Google Authenticator or Authy app

✅ You now have a secure IAM User setup!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Use Groups, not individual users, to assign permissions. If you need to update permissions for a team, change the group policy — not each user individually.

> 💡 **Tip 2:** Never create access keys for the Root account. If access keys are compromised, anyone can do anything to your account.

> 💡 **Tip 3:** Always enable MFA (Multi-Factor Authentication) on all IAM users, especially the Root account and Admin users.

> 💡 **Tip 4:** Use IAM Roles for EC2 instances and other services — never hardcode access keys in application code.

---

## ❓ Quick Quiz

**Question 1:** Your EC2 instance needs to write files to S3. How should you grant this permission?

```
A) Create an IAM User and put access keys in the code
B) Assign an IAM Role with S3 write permissions to the EC2
C) Make the S3 bucket public
D) Use the Root account credentials
```
**Answer: B** — IAM Roles are the correct and secure way to give EC2 access to other AWS services.

---

**Question 2:** You have 50 developers who all need the same permissions. What is the BEST way to manage this?

```
A) Create 50 individual policies for each user
B) Give all of them AdministratorAccess
C) Create an IAM Group with the policy, add all users to it
D) Share one IAM User account between all 50
```
**Answer: C**

---

## 🎤 Interview Questions

**Q: What is IAM and what are its key components?**

> IAM (Identity and Access Management) is AWS's service for managing who can access your AWS account and what they can do. The key components are: Users (individual people or applications), Groups (collections of users that share permissions), Policies (JSON documents that define permissions), and Roles (temporary permissions that can be assumed by users or AWS services). IAM helps enforce the Principle of Least Privilege.

**Q: When would you use an IAM Role instead of an IAM User?**

> I would use an IAM Role when an AWS service like EC2 needs to access another AWS service like S3. Instead of creating a user with static access keys, I assign a role to the EC2 instance. The role provides temporary credentials that automatically rotate, which is much more secure. I would also use roles for cross-account access, where a user from one AWS account needs to access resources in another account.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 17 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ IAM = Controls WHO can access WHAT in AWS           │
│  ✅ IAM User = A person/app with long-term credentials  │
│  ✅ IAM Group = Collection of users with same policy    │
│  ✅ IAM Policy = JSON document defining permissions     │
│  ✅ IAM Role = Temporary permissions for services       │
│  ✅ Principle of Least Privilege = give minimum access  │
│  ✅ NEVER use Root account for daily tasks              │
│  ✅ Always enable MFA on Root and Admin accounts        │
│  ✅ EC2 needing S3 access → Use Role, not access keys   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
