---
title: "Chapter 20 — When Things Go Wrong (Troubleshooting)"
sidebar_position: 20
description: "By the end of this chapter, you will be able to: Diagnose and fix Terraform issues"
---

## 📖 Story First

Construction is going well. Then one morning, TerraBuilders calls Ramesh: *"Sir, there is a problem. The BESCOM application was rejected — the property documents do not match their records."*

How do we diagnose what happened?

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Read plan output for warning signs
- ✅ Use debug logging (TF_LOG)
- ✅ Use `terraform refresh` to sync state

---

## ☁️ The Actual Concept

### Reading Plan Output for Issues

```bash
$ terraform plan

# Warning signs to watch for:
# 1. Unexpected destroys
-/+ aws_db_instance.main (forces replacement)
# ⚠️ Your database will be destroyed!

# 2. Unexpectedly large changes
Plan: 47 to add, 12 to change, 8 to destroy.
# ⚠️ You changed one thing — why 67 changes?

# 3. Drift detected
~ aws_security_group.web
    ingress: someone added a rule manually
# ⚠️ Infrastructure changed outside Terraform
```

### Debug Logging

```bash
# Enable detailed logging
$ export TF_LOG=DEBUG
$ terraform apply

# Log levels: TRACE, DEBUG, INFO, WARN, ERROR

# Save to file
$ export TF_LOG_PATH=terraform_debug.log
$ terraform plan
```

### `terraform refresh`

Updates state file to match real-world resources:

```bash
$ terraform refresh
```

---

## 🧪 Hands-On — Troubleshoot a Problem

```
STEP 1: Simulate a problem:
         Go to AWS Console and manually change a tag
         on your instance.

STEP 2: Run plan to detect the drift:
         $ terraform plan
         Look for the ~ changes showing drift.

STEP 3: Run terraform apply to restore:
         $ terraform apply
         Terraform will restore the tag to match your config.

STEP 4: Enable debug logging:
         $ export TF_LOG=DEBUG
         $ terraform plan
         (Observe the detailed output)

✅ You can detect and fix problems!
   Like TerraBuilders investigating the BESCOM issue
   by checking every document in detail.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does TF_LOG=DEBUG do?",
        "options": [
            "Deletes the state file",
            "Enables detailed logging for troubleshooting",
            "Formats your code",
            "Destroys all resources"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What does the ~ symbol in plan output indicate?",
        "options": [
            "A new resource will be created",
            "An existing resource will be updated in-place",
            "A resource will be destroyed",
            "A resource will be replaced"
        ],
        "correct": 1,
        "explanation": "~ means in-place modification (drift or config change)."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│           CHAPTER 20 SUMMARY                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Watch for unexpected destroys (-/+) in plan         │
│  ✅ Watch for unexpectedly large change counts          │
│  ✅ TF_LOG=DEBUG = full activity log for debugging      │
│  ✅ terraform refresh = fresh state sync                │
│  ✅ Drift = manual changes outside Terraform            │
│  ✅ Always read the plan carefully before applying      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
