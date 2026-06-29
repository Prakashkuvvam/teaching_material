---
title: "Chapter 2 — What is AWS?"
sidebar_position: 2
description: "By the end of this chapter, you will be able to: Explain what AWS is and who created it"
---

## 📖 Story First

After learning about cloud computing, Rahul asks:

*"This sounds great. But who actually provides this cloud? Where do I go?"*

Great question, Rahul.

Imagine you want to rent office space. You do not build the office building yourself. You go to a company that already owns thousands of office buildings around the world and rents out desks, rooms, and floors to anyone who needs them.

**Amazon Web Services (AWS)** is that company — but for the cloud.

Amazon started as an online bookstore. To run their business, they built an enormous technology infrastructure. Over time, they realized their infrastructure was so powerful that other companies might want to use it too. So in 2006, they started renting out access to their technology.

Today, AWS is the **world's largest cloud provider**. More than one million businesses use it — from small startups to NASA, Netflix, Airbnb, and your favorite apps.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what AWS is and who created it
- ✅ Know why AWS is the most popular cloud platform
- ✅ Understand the AWS Free Tier
- ✅ Know how to create an AWS account

---

## ☁️ The Actual Concept

**AWS (Amazon Web Services)** is a cloud computing platform provided by Amazon.

It offers over **200 services** including compute, storage, databases, networking, security, machine learning, and much more.

```
┌─────────────────────────────────────────────────────────┐
│                    AWS AT A GLANCE                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🏢 Founded         : 2006 by Amazon                   │
│  🌍 Regions         : 33+ around the world             │
│  📦 Services        : 200+ services                    │
│  👥 Customers       : 1 Million+ businesses            │
│  💰 Market Share    : ~32% of global cloud market      │
│                                                         │
│  Famous Customers:                                      │
│  🎬 Netflix    🏠 Airbnb    🚗 BMW                      │
│  🚀 NASA       🎮 Epic Games  📱 Samsung               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🏫 School Analogy

If **Cloud Computing** is the concept of a school system, then **AWS** is one of the most famous and largest school systems in the world — like a prestigious international school chain with campuses everywhere.

Just like a school offers many services:
- 📚 Library (Storage)
- 🖥️ Computer Lab (Compute)
- 🏃 Sports Ground (Scaling)
- 📞 Office (Management)
- 🔒 Security Guard (Security)

AWS offers all of these — but for your technology needs.

---

## 🆚 AWS vs Other Cloud Providers

AWS is not the only cloud provider. But it is the biggest.

```
┌──────────────────────────────────────────────────────────┐
│              CLOUD PROVIDER COMPARISON                   │
├────────────────┬───────────┬──────────────┬─────────────┤
│   Feature      │    AWS    │    Azure     │    GCP      │
├────────────────┼───────────┼──────────────┼─────────────┤
│ Founded By     │ Amazon    │ Microsoft    │ Google      │
│ Market Share   │ ~32%      │ ~23%         │ ~12%        │
│ Services       │ 200+      │ 200+         │ 150+        │
│ Best Known For │ Breadth   │ Enterprise   │ Data & AI   │
│                │ of tools  │ integration  │ capabilities│
└────────────────┴───────────┴──────────────┴─────────────┘
```

---

## 🆓 AWS Free Tier

Good news for beginners.

AWS gives you a **Free Tier** account. This means you can practice with real AWS services without paying anything — within certain limits.

```
┌─────────────────────────────────────────────────────────┐
│                   AWS FREE TIER                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ⏰ 12 Months Free  — After creating account           │
│  Always Free        — Some services free forever       │
│  Free Trials        — Short-term free trials           │
│                                                         │
│  What you get FREE for 12 months:                      │
│  • 750 hours/month of EC2 (virtual servers)            │
│  • 5 GB of S3 storage                                  │
│  • 750 hours/month of RDS (database)                   │
│  • 1 million Lambda requests/month                     │
│  • And much more...                                    │
│                                                         │
│  ⚠️ Always set billing alerts to avoid charges!        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Hands-On Lab — Create Your AWS Account

Let us get you set up right now.

```
STEP 1: Go to aws.amazon.com
        Click "Create an AWS Account"

STEP 2: Enter your email address
        Choose a strong password
        Give your account a name

STEP 3: Enter your personal details
        Choose "Personal" account type

STEP 4: Enter payment details
        (You will NOT be charged if you stay within Free Tier)

STEP 5: Verify your phone number
        AWS will call or text you with a code

STEP 6: Choose the FREE support plan
        (Basic Support — No cost)

STEP 7: Sign in to the AWS Console
        You now have access to 200+ services!

IMPORTANT AFTER SIGN IN:
┌─────────────────────────────────────────────────┐
│  ⚠️  SET UP A BILLING ALARM IMMEDIATELY         │
│  Go to: Billing → Budgets → Create a budget     │
│  Set alert at $5 so you never get surprised     │
└─────────────────────────────────────────────────┘
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Never use your Root account for daily tasks. The Root account is like the school principal — it has unlimited power. We will create safer accounts using IAM later.

> 💡 **Tip 2:** Set a billing alarm before doing anything else. This is the first thing every AWS professional does.

> 💡 **Tip 3:** Bookmark the AWS Console at console.aws.amazon.com — you will use it daily.

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "In what year did AWS officially launch?",
        "options": [
            "2000",
            "2004",
            "2006",
            "2010"
        ],
        "correct": 2,
        "explanation": "AWS launched in 2006."
    },
    {
        "id": 2,
        "question": "Which of the following is NOT an AWS competitor?",
        "options": [
            "Microsoft Azure",
            "Google Cloud Platform",
            "GitHub",
            "None of the above"
        ],
        "correct": 2,
        "explanation": "GitHub is a code repository service, not a cloud infrastructure competitor."
    }
]} />

---

## 🎤 Interview Questions

**Q: What is AWS?**

> AWS is Amazon's cloud computing platform that provides over 200 services including compute, storage, networking, and databases. It allows businesses to build and run applications without owning physical hardware.

**Q: Why is AWS the most popular cloud provider?**

> AWS was the first major cloud provider, giving it years of maturity, the widest range of services, the largest community, the most certifications, and the most third-party integrations. It holds around 32% of the global cloud market.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 2 SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ AWS = Amazon's cloud platform, launched 2006        │
│  ✅ Offers 200+ services globally                       │
│  ✅ Largest cloud provider (~32% market share)          │
│  ✅ Competitors = Azure (Microsoft), GCP (Google)       │
│  ✅ Free Tier available for 12 months                   │
│  ✅ Always set billing alerts first!                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
