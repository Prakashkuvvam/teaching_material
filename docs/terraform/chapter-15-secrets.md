---
title: "Chapter 15 — Handling Secrets (Sensitive Variables)"
sidebar_position: 15
description: "By the end of this chapter, you will be able to: Handle sensitive information securely"
---

## 📖 Story First

The house requires some sensitive information:
- Bank loan account number (for construction disbursements)
- Safe combination for the main vault
- Alarm system PIN code

TerraBuilders needs this information to complete tasks. But this information must **never appear in public documents** — not in the requirements file, not in municipal filings, not in any public records.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Mark variables as sensitive to hide values
- ✅ Pass secrets via environment variables
- ✅ Use `.gitignore` to exclude sensitive files

---

## ☁️ The Actual Concept

### Sensitive Variables

```hcl
variable "database_password" {
  description = "Master database password"
  type        = string
  sensitive   = true    # Never print in logs or output
}

variable "api_secret_key" {
  description = "API authentication secret"
  type        = string
  sensitive   = true
}
```

### Passing Secrets

```bash
# Via environment variable (recommended)
$ export TF_VAR_database_password="MySuperSecret123!"
$ terraform apply

# Via a separate secrets file (NOT committed to git)
$ terraform apply -var-file="secrets.tfvars"
```

### What to Exclude from Git

```gitignore
# .gitignore
*.tfvars          # Variable files with secrets
*.tfstate         # State files (contain sensitive data)
*.tfstate.backup  # State backups
.terraform/       # Downloaded providers
secrets/          # Any secrets folder
```

---

## 🧪 Hands-On — Use a Sensitive Variable

```
STEP 1: Define a sensitive variable:

         variable "db_password" {
           description = "Database password"
           type        = string
           sensitive   = true
         }

STEP 2: Create a secrets.tfvars file (add to .gitignore):

         db_password = "MySecurePassword123!"

STEP 3: Apply with the secrets file:

         $ terraform apply -var-file="secrets.tfvars"

         The password will not appear in plan output or logs.

✅ Secrets are handled safely!
   Like handing the alarm PIN in a sealed envelope,
   not written on the public blueprint.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does sensitive = true do?",
        "options": [
            "Encrypts the variable in the state file",
            "Prevents the value from appearing in logs and output",
            "Deletes the value after use",
            "Sends the value to HashiCorp for safe storage"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "Which files should NOT be committed to Git?",
        "options": [
            "main.tf and variables.tf",
            "*.tfvars and *.tfstate",
            "outputs.tf and providers.tf",
            "README and .gitignore"
        ],
        "correct": 1,
        "explanation": "State files and variable files with secrets must not be committed to version control."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│            CHAPTER 15 SUMMARY                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ sensitive = true hides values from output           │
│  ✅ Pass secrets via TF_VAR_ env variables              │
│  ✅ Use -var-file for separate secret files             │
│  ✅ Never commit .tfvars or .tfstate files              │
│  ✅ Like alarm PINs in a sealed envelope                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
