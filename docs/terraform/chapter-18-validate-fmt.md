---
title: "Chapter 18 — Quality Control (Validate & Format)"
sidebar_position: 18
description: "By the end of this chapter, you will be able to: Use fmt and validate for code quality"
---

## 📖 Story First

TerraBuilders has a quality control process. Before any plan is shown to the client, it goes through two checks:
1. **Format check:** Is the document in the correct format? Are sections properly organized?
2. **Logic check:** Are the requirements logically complete? Any contradictions?

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Use `terraform fmt` to auto-format code
- ✅ Use `terraform validate` to check configuration validity
- ✅ Establish a quality checklist before every apply

---

## ☁️ The Actual Concept

### `terraform fmt` — Format Check

Auto-formats your code to standard style:

```bash
# Before fmt (messy):
resource "aws_instance" "web" {
ami="ami-0abcdef1234567890"
  instance_type    =    "t2.micro"
    tags={Name="server"}
}

# After fmt (clean):
resource "aws_instance" "web" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t2.micro"
  tags          = { Name = "server" }
}
```

### `terraform validate` — Logic Check

Checks if configuration is logically valid:

```bash
$ terraform validate

# If valid:
Success! The configuration is valid.

# If error:
Error: Reference to undeclared resource
  on main.tf line 15:
  subnet_id = aws_subnet.nonexistent.id
```

### The Quality Checklist

```bash
# Run these in order before every apply:
terraform fmt        # Fix formatting
terraform validate   # Check logic
terraform plan       # Preview changes
terraform apply      # Execute
```

---

## 🧪 Hands-On — Run Quality Checks

```
STEP 1: Intentionally create an error in your config
         (reference a resource that does not exist).

STEP 2: Run terraform validate and see the error:
         $ terraform validate

STEP 3: Fix the error and run:
         $ terraform fmt
         $ terraform validate

STEP 4: Run the full quality checklist:
         $ terraform fmt -recursive
         $ terraform validate
         $ terraform plan

✅ Your code is now clean and correct!
   Like a quality officer checking every document.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does terraform fmt do?",
        "options": [
            "Checks configuration logic",
            "Auto-formats code to standard style",
            "Formats the state file",
            "Formats the output display"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What does terraform validate check?",
        "options": [
            "Whether providers are installed",
            "Configuration syntax and reference correctness",
            "Whether the state file exists",
            "Whether infrastructure is healthy"
        ],
        "correct": 1,
        "explanation": "Validate checks for syntax errors, valid references, and required fields."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│            CHAPTER 18 SUMMARY                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ terraform fmt = auto-format code (spell check)     │
│  ✅ terraform validate = check logic (review)          │
│  ✅ fmt → validate → plan → apply = quality flow       │
│  ✅ fmt -recursive formats all subdirectories          │
│  ✅ Validate catches errors before they cause problems  │
│  ✅ Like a quality officer checking every document      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
