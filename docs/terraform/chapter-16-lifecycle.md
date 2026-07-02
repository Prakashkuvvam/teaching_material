---
title: "Chapter 16 — Renovations (Modifying & Lifecycle)"
sidebar_position: 16
description: "By the end of this chapter, you will be able to: Modify resources and use lifecycle rules"
---

## 📖 Story First

The Sharma house is complete and the family has been living in it for a year.

Now they want changes:
- **Small:** Paint the guest bedroom from white to light blue
- **Medium:** Add a balcony railing
- **Major:** Convert the study room into a second bathroom

Each change has different implications. Paint is a surface change. Adding a railing is additive. Converting a room means demolition and rebuilding.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Understand in-place vs destroy-and-recreate changes
- ✅ Use the `lifecycle` block (create_before_destroy, prevent_destroy, ignore_changes)
- ✅ Read plan symbols to identify change types

---

## ☁️ The Actual Concept

### In-Place Modification (Renovation)

Some changes can be applied without destroying the resource:

```hcl
# Changing tags — in-place update
resource "aws_instance" "web_server" {
  instance_type = "t2.micro"
  tags = {
    Color = "light blue"    # Changed from "white"
  }
}
```

```bash
$ terraform plan
~ aws_instance.web_server
    tags.Color: "white" → "light blue"

Plan: 0 to add, 1 to change, 0 to destroy.
```

### Destroy and Recreate (Tear Down and Rebuild)

Some changes cannot be done in-place:

```hcl
# Changing AMI forces replacement
resource "aws_instance" "web_server" {
  ami           = "ami-new-version"    # Changed
  instance_type = "t2.micro"
}
```

```bash
$ terraform plan
-/+ aws_instance.web_server (forces replacement)

Plan: 1 to add, 0 to change, 1 to destroy.
```

### The `lifecycle` Block

```hcl
resource "aws_instance" "web_server" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t2.micro"

  lifecycle {
    # Build new before destroying old (zero downtime)
    create_before_destroy = true

    # Never destroy this resource (safety net)
    prevent_destroy = true

    # Ignore changes to these attributes
    ignore_changes = [tags["LastModified"]]
  }
}
```

| Lifecycle Rule | Analogy | Use Case |
|---------------|---------|----------|
| `create_before_destroy` | Build new bathroom before demolishing old one | Zero-downtime replacements |
| `prevent_destroy` | "Never demolish the main structure" | Protect critical resources |
| `ignore_changes` | "I repaint walls myself, don't track it" | Skip Terraform-triggered changes |

---

## 🧪 Hands-On — Use Lifecycle Rules

```
STEP 1: Add lifecycle to your instance:

         resource "aws_instance" "web_server" {
           ami           = "ami-0abcdef1234567890"
           instance_type = "t2.micro"

           lifecycle {
             create_before_destroy = true
           }
         }

STEP 2: Change the AMI ID and run plan:

         $ terraform plan

         Observe: The plan shows a new instance will be
         created BEFORE the old one is destroyed.

STEP 3: Change the instance type and run plan:

         Observe: Instance type changes are in-place (~)
         No replacement needed.

✅ You can control exactly how changes behave!
   Like telling TerraBuilders:
   "Always build the new room before demolishing the old one."
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does create_before_destroy do?",
        "options": [
            "Destroys the old resource before creating the new one",
            "Creates the new resource before destroying the old one",
            "Creates the resource only if it does not already exist",
            "Prevents any changes to the resource"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "Which plan symbol indicates a resource will be destroyed and recreated?",
        "options": [
            "+",
            "~",
            "-/+",
            "-"
        ],
        "correct": 2,
        "explanation": "-/+ means the resource will be destroyed and recreated (forces replacement)"
    },
    {
        "id": 3,
        "question": "What is the purpose of prevent_destroy?",
        "options": [
            "To prevent any changes to the resource",
            "To prevent accidental deletion of a critical resource",
            "To prevent Terraform from running",
            "To prevent the resource from being created"
        ],
        "correct": 1,
        "explanation": "prevent_destroy acts as a safety net — Terraform will refuse to destroy the resource."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│            CHAPTER 16 SUMMARY                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ In-place change (~) = renovation, no replacement    │
│  ✅ Forces replacement (-/+) = destroy & rebuild        │
│  ✅ create_before_destroy = zero-downtime replacement   │
│  ✅ prevent_destroy = safety net for critical resources │
│  ✅ ignore_changes = skip tracking certain attributes   │
│  ✅ Always review plan to understand change type        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
