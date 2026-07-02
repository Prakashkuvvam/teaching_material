---
title: "Chapter 17 — Tearing Down (Terraform Destroy)"
sidebar_position: 17
description: "By the end of this chapter, you will be able to: Safely destroy infrastructure"
---

## 📖 Story First

Five years later. The Sharmas sell the Whitefield property. The new buyer wants a completely fresh start — the plot cleared, nothing remaining.

Ramesh calls TerraBuilders: *"Please clear everything you built."*

TerraBuilders opens the as-built record, looks at every single thing they built, and dismantles everything in reverse order: fittings → interior → electrical → walls → foundation.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Safely destroy all managed infrastructure
- ✅ Destroy specific resources with -target
- ✅ Understand the destroy order (reverse dependencies)

---

## ☁️ The Actual Concept

### `terraform destroy`

Removes **everything** Terraform created:

```bash
$ terraform destroy

Terraform will destroy the following resources:
  - aws_instance.web_server
  - aws_security_group.web_sg
  - aws_subnet.web
  - aws_vpc.main

Plan: 0 to add, 0 to change, 4 to destroy.

Do you really want to destroy all resources?
  Enter a value: yes

aws_instance.web_server: Destroying...
aws_vpc.main: Destruction complete

Destroy complete! Resources: 4 destroyed.
```

### Targeted Destroy

```bash
# Destroy only one specific resource
$ terraform destroy -target=aws_instance.web_server
```

---

## 🧪 Hands-On — Destroy Your Infrastructure

```
WARNING: This will delete all your infrastructure.
Only do this if you are sure about it.

STEP 1: Preview what will be destroyed:
         $ terraform plan -destroy

STEP 2: Destroy everything:
         $ terraform destroy

         Type "yes" to confirm.

STEP 3: Verify nothing remains:
         Check AWS Console — all resources should be gone.

✅ Infrastructure safely demolished!
   Like TerraBuilders clearing the entire plot.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does terraform destroy do?",
        "options": [
            "Removes all resources managed by Terraform",
            "Deletes the .tf configuration files",
            "Stops the Terraform process",
            "Removes the provider plugins"
        ],
        "correct": 0,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "How do you destroy only one specific resource?",
        "options": [
            "terraform destroy --single",
            "terraform destroy -target=resource_type.name",
            "terraform state rm resource_type.name",
            "You cannot destroy individual resources"
        ],
        "correct": 1,
        "explanation": "Use -target to destroy a specific resource."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│            CHAPTER 17 SUMMARY                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ terraform destroy = clear all managed infra         │
│  ✅ Destroys in reverse dependency order                │
│  ✅ Use -target for selective destruction               │
│  ✅ Always review plan-destroy before destroying        │
│  ✅ Cannot be undone — be very careful                  │
│  ✅ Like demolishing a house in reverse order           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
