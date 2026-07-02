---
title: "Chapter 22 — Team Work (Collaboration)"
sidebar_position: 22
description: "By the end of this chapter, you will be able to: Collaborate on Terraform projects in teams"
---

## 📖 Story First

The Sharma family is now building a small apartment complex — 12 flats. The project involves multiple people:
- Ramesh handles structure and civil decisions
- Priya handles interior design decisions
- Their son Arun (from the US) handles technology systems
- An external consultant handles legal compliance

All four people need to read the current requirements, propose changes, run inspections, execute changes, and see the as-built records. How does this work without people overwriting each other's changes?

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Set up a team collaboration workflow
- ✅ Use Git for version control of Terraform configs
- ✅ Understand the importance of remote state + locking

---

## ☁️ The Actual Concept

### The Collaboration Problem

```
WITHOUT PROPER SETUP:
─────────────────────
Engineer A runs apply → state updated
Engineer B runs apply → overwrites A's changes → CHAOS

WITH PROPER SETUP:
──────────────────
Remote state + State locking + Version control
→ Controlled collaboration
```

### The Solution Stack

**1. Remote State**

```hcl
# Everyone shares the same state file
terraform {
  backend "s3" {
    bucket         = "sharma-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

**2. Version Control (Git)**

```bash
# Standard team workflow
git pull origin main              # Get latest
# Make changes
terraform fmt                     # Format
terraform validate                # Validate
terraform plan                    # Review
git add .
git commit -m "Add monitoring server"
git push origin main              # Share
# Team reviews pull request
# After approval:
terraform apply
```

**3. State Locking**

```
Ramesh runs terraform apply → State LOCKED 🔒
Priya tries terraform apply → Error: locked by Ramesh
Ramesh finishes → State UNLOCKED 🔓
Priya runs apply → Proceeds normally
```

---

## 🧪 Hands-On — Team Setup

```
STEP 1: Create a Git repository for your Terraform code:
         $ git init
         $ git add .
         $ git commit -m "Initial Terraform config"

STEP 2: Configure remote state (S3 backend).

STEP 3: Push to a shared repository (GitHub/GitLab).

STEP 4: Team workflow:
         $ git pull
         # Make changes
         $ terraform fmt && terraform validate
         $ git add -A && git commit -m "description"
         $ git push
         # Create pull request
         # Review in PR
         # Merge and terraform apply

✅ Your team can collaborate safely!
   Like having one master binder in a bank locker,
   with a sign-out register (locking) and
   a full change history (Git).
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What three things are needed for safe team collaboration?",
        "options": [
            "Remote state, state locking, and version control",
            "Email, phone, and meetings",
            "AWS, Azure, and GCP",
            "Three engineers working independently"
        ],
        "correct": 0,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What prevents two people from running terraform apply simultaneously?",
        "options": [
            "The Git branch protection rules",
            "State locking (e.g., DynamoDB)",
            "Terraform does not allow parallel execution",
            "The cloud provider prevents it"
        ],
        "correct": 1,
        "explanation": "State locking ensures only one apply runs at a time."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│           CHAPTER 22 SUMMARY                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Remote state = shared as-built records              │
│  ✅ State locking = prevent concurrent applies          │
│  ✅ Git = change history for .tf files                  │
│  ✅ Pull request workflow = code review                 │
│  ✅ Team workflow: pull → edit → plan → PR → apply     │
│  ✅ Like a bank locker + sign-out register + audit log  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
