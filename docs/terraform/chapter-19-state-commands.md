---
title: "Chapter 19 — Looking at What You Have (State Commands)"
sidebar_position: 19
description: "By the end of this chapter, you will be able to: Use state management commands"
---

## 📖 Story First

The Sharma house has been built. Six months pass. Ramesh wants to know:
- *"What exactly did TerraBuilders build?"*
- *"Can you show me just the details of the main gate?"*
- *"We built that boundary wall before TerraBuilders started managing the project. Can you add it to your records without rebuilding it?"*

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ View state with `terraform show` and `terraform state list`
- ✅ Import existing resources into Terraform management
- ✅ Remove resources from state without destroying them

---

## ☁️ The Actual Concept

### `terraform show` — Read the Complete Record

```bash
$ terraform show

# aws_instance.web_server:
resource "aws_instance" "web_server" {
    id                = "i-0a1b2c3d4e5f67890"
    ami               = "ami-0abcdef1234567890"
    instance_type     = "t2.micro"
    public_ip         = "13.235.78.92"
    # ... all attributes
}
```

### `terraform state list` — Table of Contents

```bash
$ terraform state list
aws_instance.web_server
aws_security_group.web_sg
aws_subnet.private
aws_vpc.main
```

### `terraform state show` — One Specific Entry

```bash
$ terraform state show aws_instance.web_server
```

### `terraform import` — Add Existing Resources

Bring a resource created outside Terraform under management:

```bash
$ terraform import aws_instance.web_server i-0a1b2c3d4e5f67890
```

### `terraform state rm` — Remove Without Destroying

```bash
$ terraform state rm aws_instance.web_server
```

---

## 🧪 Hands-On — Explore State

```
STEP 1: List everything in state:
         $ terraform state list

STEP 2: Show details of one resource:
         $ terraform state show aws_instance.web_server

STEP 3: View the raw state:
         $ terraform show

✅ You can inspect every detail of your infrastructure!
   Like opening the as-built records and reading any page.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does terraform import do?",
        "options": [
            "Creates a new resource",
            "Brings an existing resource under Terraform management",
            "Downloads provider plugins",
            "Exports the state file"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What happens when you run terraform state rm?",
        "options": [
            "The resource is destroyed",
            "The resource is removed from state but still exists",
            "The resource is recreated",
            "The state file is deleted"
        ],
        "correct": 1,
        "explanation": "terraform state rm removes a resource from state without destroying it."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│           CHAPTER 19 SUMMARY                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ terraform show = read all state                     │
│  ✅ terraform state list = list all managed resources   │
│  ✅ terraform state show = details of one resource      │
│  ✅ terraform import = adopt existing resources         │
│  ✅ terraform state rm = stop tracking without destroy  │
│  ✅ Like reading, adding to, or removing from records   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
