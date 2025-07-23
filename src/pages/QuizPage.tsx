import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Trophy,
  Clock,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { lessonsData } from "./LessonViewer";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirst, formatAgeGroupLabel } from "@/lib/utils";

// Quiz data
const quizzes = [
  {
    id: 1,
    title: "Understanding Your Relationship with Money Quiz",
    lessonTitle: "Understanding Your Relationship with Money",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the main purpose of creating a budget?",
        options: [
          "To save money for the future",
          "To avoid spending money on needs",
          "To live within your means and avoid debt",
          "To focus only on saving accounts",
        ],
        correctAnswer: 2,
        explanation:
          "A budget helps you live within your means and avoid debt by planning your spending.",
      },
      {
        id: 2,
        question: "What is the difference between saving and borrowing money?",
        options: [
          "Saving means borrowing money, and borrowing means saving money",
          "Saving means putting money away for a specific purpose, while borrowing means taking money from someone else",
          "Saving means using a piggy bank, while borrowing means using a bank account",
          "Saving means paying interest on a loan, while borrowing means not paying interest",
        ],
        correctAnswer: 1,
        explanation:
          "Saving is putting money away for a purpose; borrowing is taking money from someone else, usually with the intent to pay it back.",
      },
      {
        id: 3,
        question:
          "What is the main difference between a checking account and a savings account?",
        options: [
          "Checking accounts earn interest, while savings accounts do not",
          "Checking accounts are for immediate needs, while savings accounts are for long-term savings",
          "Checking accounts are linked to a credit card, while savings accounts are used for budgeting",
          "Checking accounts are used to pay bills, while savings accounts are used for financial goals",
        ],
        correctAnswer: 0,
        explanation:
          "Checking accounts are typically used for daily transactions and may not earn interest, while savings accounts are for saving money and often earn interest.",
      },
      {
        id: 4,
        question:
          "What is the difference between a credit card and a debit card?",
        options: [
          "Credit cards are issued by banks, while debit cards are issued by retail stores",
          "Credit cards require a credit check, while debit cards do not",
          "Credit cards charge interest, while debit cards do not",
          "Credit cards offer rewards, while debit cards do not",
        ],
        correctAnswer: 1,
        explanation:
          "Credit cards usually require a credit check and allow you to borrow money, while debit cards use your own funds.",
      },
      {
        id: 5,
        question: "What is the main goal of learning financial literacy?",
        options: [
          "To understand the difference between needs and wants",
          "To be able to create a budget and avoid debt",
          "To know how to invest money for the future",
          "To be able to use credit cards and loans wisely",
        ],
        correctAnswer: 1,
        explanation:
          "The main goal is to be able to create a budget and avoid debt, which are key aspects of financial literacy.",
      },
    ],
  },
  {
    id: 2,
    title: "Budgeting Basics Quiz",
    lessonTitle: "Budgeting Basics",
    category: "budgeting",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "According to the 50-30-20 rule, what percentage of your income should go towards savings?",
        options: ["10%", "20%", "30%", "40%"],
        correctAnswer: 1,
        explanation:
          "The 50-30-20 rule suggests 20% of your income should go towards savings.",
      },
      {
        id: 2,
        question:
          "According to the speaker, what should be the first step in creating a budget?",
        options: [
          "Determine your monthly income.",
          "Decide how much you can spend on wants.",
          "Set a savings goal for the future.",
          "Estimate your future expenses and income.",
        ],
        correctAnswer: 0,
        explanation:
          "The first step in creating a budget is to determine your monthly income.",
      },
      {
        id: 3,
        question: "What is the 50-30-20 rule in budgeting?",
        options: [
          "A guideline that allocates income into three categories",
          "A rule that forces you to take a look at all of your expenses",
          "A budgeting technique that allocates income into three separate categories",
          "A guideline for saving money",
        ],
        correctAnswer: 2,
        explanation:
          "The 50-30-20 rule is a budgeting technique that allocates income into three separate categories.",
      },
      {
        id: 4,
        question:
          "What are some expenses that could be considered needs in the 50-30-20 rule?",
        options: [
          "Cars and vacations",
          "Groceries and utilities",
          "Entertainment and vacations",
          "Cars and entertainment",
        ],
        correctAnswer: 1,
        explanation: "Needs include groceries and utilities.",
      },
      {
        id: 5,
        question:
          "What are some examples of expenses that would be considered wants in the 50-30-20 rule?",
        options: [
          "Rent or home payments",
          "Groceries and utilities",
          "Phone and video games",
          "Cars and entertainment",
        ],
        correctAnswer: 2,
        explanation: "Wants include phone and video games.",
      },
    ],
  },
  {
    id: 3,
    title: "Banking & How to Use It Quiz",
    lessonTitle: "Banking & How to Use It",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the role of banks in the economy?",
        options: [
          "To stimulate economic growth.",
          "To provide financial advisory services.",
          "To manage risks.",
          "All of the above.",
        ],
        correctAnswer: 3,
        explanation:
          "Banks play multiple roles in the economy, including stimulating growth, providing advisory services, and managing risks.",
      },
      {
        id: 2,
        question: "What is the main source of income for a bank?",
        options: [
          "Interest on loans.",
          "Fees for services.",
          "Investment returns.",
          "All of the above.",
        ],
        correctAnswer: 3,
        explanation:
          "Banks earn income from interest, fees, and investments, but interest on loans is typically the largest source.",
      },
      {
        id: 3,
        question: "What is compound interest?",
        options: [
          "The interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods.",
          "The interest charged on overdrafts.",
          "The interest charged on accounts with negative balances.",
          "None of the above.",
        ],
        correctAnswer: 0,
        explanation:
          "Compound interest is calculated on both the initial principal and the accumulated interest from previous periods.",
      },
      {
        id: 4,
        question: "What is a credit score?",
        options: [
          "A measure of your ability to repay a loan.",
          "A measure of your ability to make a purchase.",
          "A measure of your ability to save money.",
          "None of the above.",
        ],
        correctAnswer: 0,
        explanation:
          "A credit score is a measure of your ability to repay a loan, used by lenders to assess credit risk.",
      },
      {
        id: 5,
        question: "How can you manage credit card debt effectively?",
        options: [
          "Paying the minimum payment.",
          "Keeping your balance low.",
          "Avoiding unnecessary purchases.",
          "All of the above.",
        ],
        correctAnswer: 3,
        explanation:
          "All of these actions help manage credit card debt effectively.",
      },
    ],
  },
  {
    id: 4,
    title: "Saving & Emergency Funds Quiz",
    lessonTitle: "Saving and Emergency Funds",
    category: "saving",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is an emergency fund?",
        options: [
          "A separate bank account that's set aside to help you if there are any curveballs thrown in your life.",
          "A high-yield savings account that earns you more interest.",
          "A fund to save for an upcoming vacation.",
          "A fund to help you pay off your student loans.",
        ],
        correctAnswer: 0,
        explanation:
          "An emergency fund is a separate bank account set aside for unexpected expenses or emergencies.",
      },
      {
        id: 2,
        question:
          "What is the annual percentage yield (APY) and how does it relate to high yield savings accounts?",
        options: [
          "APY is the rate of return on an investment. High yield savings accounts have a higher APY than traditional savings accounts.",
          "APY is the amount of money you can earn in a year. High yield savings accounts have a lower APY than traditional savings accounts.",
          "APY is the number of years you need to earn the interest on your high yield savings account. High yield savings accounts have a higher APY than traditional savings accounts.",
          "APY is the percentage of your income tax you have to pay. High yield savings accounts have a lower APY than traditional savings accounts.",
        ],
        correctAnswer: 0,
        explanation:
          "APY is the rate of return on an investment, and high yield savings accounts typically offer a higher APY than traditional savings accounts.",
      },
    ],
  },
  {
    id: 5,
    title: "Debt: Good vs. Bad Quiz",
    lessonTitle: "Debt: Good vs. Bad",
    category: "credit",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the difference between good debt and bad debt?",
        options: [
          "Good debt is always a bad idea, while bad debt is always a good idea.",
          "Good debt is about borrowing against depreciating assets, while bad debt is about borrowing against appreciating assets.",
          "There is no difference between good debt and bad debt.",
          "Good debt is about borrowing against appreciating assets, while bad debt is about borrowing against depreciating assets.",
        ],
        correctAnswer: 3,
        explanation:
          "Good debt is about borrowing against appreciating assets, while bad debt is about borrowing against depreciating assets.",
      },
      {
        id: 2,
        question:
          "What are the three rules of debt that should never be broken?",
        options: [
          "To never borrow against things that depreciate, to always have a well-designed and realistic exit strategy, and to acknowledge that debt holds power over your future.",
          "To always borrow against appreciating assets, to never have a well-designed and realistic exit strategy, and to never acknowledge that debt holds power over your future.",
          "To never acknowledge that debt holds power over your future, to never have a well-designed and realistic exit strategy, and to always borrow against appreciating assets.",
          "To never have a well-designed and realistic exit strategy, to always borrow against depreciating assets, and to never acknowledge that debt holds power over your future.",
        ],
        correctAnswer: 0,
        explanation:
          "The three rules are: never borrow against things that depreciate, always have a well-designed and realistic exit strategy, and acknowledge that debt holds power over your future.",
      },
      {
        id: 3,
        question: "What is a debt coverage ratio?",
        options: [
          "It is a measure of how much a property's income covers its debt payments.",
          "It is a measure of how much a property's equity can cover its debt payments.",
          "It is a measure of how much a property's assets can cover its debt payments.",
          "It is a measure of how much interest a borrower pays relative to principal payments.",
        ],
        correctAnswer: 0,
        explanation:
          "A debt coverage ratio measures how much a property's income covers its debt payments.",
      },
    ],
  },
  {
    id: 6,
    title: "Credit Cards & Credit Scores Quiz",
    lessonTitle: "Credit Cards & Credit Scores",
    category: "credit",
    completed: false,
    score: null,
    attempts: 0,
    questions: [
      {
        id: 1,
        question: "What is a credit score?",
        options: [
          "A numerical rating of your creditworthiness",
          "A three-digit number that represents your creditworthiness",
          "A score assigned by credit bureaus",
          "None of the above",
        ],
        correctAnswer: 1,
        explanation:
          "A credit score is a three-digit number that represents your creditworthiness.",
      },
      {
        id: 2,
        question:
          "What is the most significant factor in determining a credit score?",
        options: [
          "Payment history",
          "Credit utilization",
          "Length of credit history",
          "All of the above",
        ],
        correctAnswer: 1,
        explanation:
          "Credit utilization is the most significant factor in determining a credit score.",
      },
      {
        id: 3,
        question: "How can you improve your credit score?",
        options: [
          "Pay bills late",
          "Keep credit utilization low",
          "Close old credit accounts",
          "All of the above",
        ],
        correctAnswer: 1,
        explanation:
          "Keeping your credit utilization low can help improve your credit score.",
      },
      {
        id: 4,
        question: "What can negatively impact your credit score?",
        options: [
          "Late payments",
          "High credit card balances",
          "Applying for too much credit",
          "All of the above",
        ],
        correctAnswer: 0,
        explanation: "Late payments can negatively impact your credit score.",
      },
      {
        id: 5,
        question: "What is a revolving credit line?",
        options: [
          "A line of credit that you can borrow from as needed",
          "A set amount of money given to you upfront",
          "A form of installment loan",
        ],
        correctAnswer: 1,
        explanation:
          "A revolving credit line is a set amount of money given to you upfront.",
      },
      {
        id: 6,
        question:
          "What is the recommended balance for credit card utilization?",
        options: [
          "30% or less of your credit card limit",
          "50% or less of your credit card limit",
          "75% or less of your credit card limit",
          "100% of your credit card limit",
        ],
        correctAnswer: 0,
        explanation:
          "It is recommended to keep your credit card utilization at 30% or less of your credit card limit.",
      },
      {
        id: 7,
        question: "What are some benefits of using credit cards?",
        options: [
          "Fraud protection, cash back rewards, and travel benefits",
          "Interest-free loans and travel discounts",
          "Increased credit limit and rewards for paying bills on time",
          "All of the above",
        ],
        correctAnswer: 1,
        explanation:
          "Credit cards offer fraud protection, cash back rewards, and travel benefits.",
      },
    ],
  },
  {
    id: 7,
    title: "Earning Income & Your First Paycheck Quiz",
    lessonTitle: "Earning Income & Your First Paycheck",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the purpose of a pay stub?",
        options: [
          "It's a document that shows a person's income and deductions for a specific pay period.",
          "It's a piece of paper that shows a person's total earnings and deductions for a specific pay period.",
          "It's a document that breaks down a person's earnings and deductions for a specific pay period.",
          "It's a financial document that shows a person's total earnings and deductions for a specific pay period.",
        ],
        correctAnswer: 3,
        explanation:
          "A pay stub is a financial document that shows a person's total earnings and deductions for a specific pay period.",
      },
      {
        id: 2,
        question: "What are statutory deductions?",
        options: [
          "Deductions that are taken out of a person's paycheck at their employer's discretion.",
          "Deductions that are taken out of a person's paycheck by the government.",
          "Deductions that are taken out of a person's paycheck by their employer.",
          "Deductions that are taken out of a person's paycheck by their union.",
        ],
        correctAnswer: 1,
        explanation:
          "Statutory deductions are deductions that are taken out of a person's paycheck by the government.",
      },
      {
        id: 3,
        question: "What is the purpose of voluntary deductions?",
        options: [
          "To help fund federal programs.",
          "To save or pay for things on a pre-tax basis.",
          "To pay for insurance.",
          "To pay for retirement savings plans.",
        ],
        correctAnswer: 1,
        explanation:
          "Voluntary deductions are used to save or pay for things on a pre-tax basis.",
      },
      {
        id: 4,
        question: "What is a flexible spending account?",
        options: [
          "A savings account that a person can contribute to on a pre-tax basis for healthcare costs that aren't covered by insurance.",
          "A retirement savings plan that a person can contribute to on a pre-tax basis.",
          "A savings account that a person can contribute to on a pre-tax basis for childcare costs.",
          "A document that breaks down a person's earnings and deductions for a specific pay period.",
        ],
        correctAnswer: 0,
        explanation:
          "A flexible spending account is a savings account that a person can contribute to on a pre-tax basis for healthcare costs that aren't covered by insurance.",
      },
    ],
  },
  {
    id: 8,
    title: "Taxes 101 Quiz",
    lessonTitle: "Taxes 101",
    category: "taxes",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the government's main purpose for collecting taxes?",
        options: [
          "To provide free goods to the public",
          "To maintain infrastructure and services for the community",
          "To pay for individual's personal expenses",
          "To fund only educational institutions",
        ],
        correctAnswer: 1,
        explanation:
          "The government collects taxes mainly to maintain infrastructure and services for the community.",
      },
      {
        id: 2,
        question:
          "What is the small fee collected by the seller when buying concert tickets online?",
        options: [
          "A sales tax",
          "A shipping fee",
          "A handling fee",
          "A service fee",
        ],
        correctAnswer: 0,
        explanation:
          "A sales tax is often collected by the seller when buying goods or services online, including concert tickets.",
      },
      {
        id: 3,
        question: "What is one way that the government uses tax money?",
        options: [
          "To provide free education to everyone",
          "To maintain public roads and buildings",
          "To fund individual's personal expenses",
          "To pay for sports teams and events",
        ],
        correctAnswer: 1,
        explanation:
          "One way the government uses tax money is to maintain public roads and buildings.",
      },
      {
        id: 4,
        question: "What is a tax?",
        options: [
          "A fee that the government charges to help pay for things like schools, roads, and emergency services",
          "A reward for good behavior",
          "A punishment for bad behavior",
          "A way for the government to get money from all of us",
        ],
        correctAnswer: 0,
        explanation:
          "A tax is a fee that the government charges to help pay for things like schools, roads, and emergency services.",
      },
    ],
  },
  {
    id: 9,
    title: "Smart Spending & Consumer Awareness Quiz",
    lessonTitle: "Smart Spending & Consumer Awareness",
    category: "budgeting",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is impulse buying?",
        options: [
          "Buying without a plan",
          "Buying after seeing a display that provokes curiosity",
          "Buying after reading a persuasive advertisement",
          "Buying without knowing the price of the item",
        ],
        correctAnswer: 1,
        explanation:
          "Impulse buying is buying after seeing a display that provokes curiosity.",
      },
      {
        id: 2,
        question:
          "What are the five factors that determine a person's likelihood to perform an impulse buy?",
        options: [
          "Display, psychic factors, psychological factors, descriptive product, and right esteem",
          "Display, psychological factors, descriptive product, and follow",
          "Psychological factors, descriptive product, and follow",
          "Psychic factors, psychological factors, follow, and right esteem",
        ],
        correctAnswer: 0,
        explanation:
          "The five factors are display, psychic factors, psychological factors, descriptive product, and right esteem.",
      },
      {
        id: 3,
        question:
          "What is a single image without any descriptive information called?",
        options: [
          "A teaser image",
          "A product description",
          "An advertisement",
          "A brochure",
        ],
        correctAnswer: 0,
        explanation:
          "A single image without any descriptive information is called a teaser image.",
      },
      {
        id: 4,
        question:
          "What can make potential customers curious and want to know more about a product?",
        options: [
          "A well-designed display",
          "A single image without any descriptive information",
          "A descriptive product",
          "A brochure",
        ],
        correctAnswer: 0,
        explanation:
          "A well-designed display can make potential customers curious and want to know more.",
      },
      {
        id: 5,
        question: "What is the first step in simplifying the buying process?",
        options: [
          "Making the product display as beautiful as possible",
          "Providing a simple payment method",
          "Writing a detailed product description",
          "Offering testimonials from satisfied customers",
        ],
        correctAnswer: 1,
        explanation:
          "Providing a simple payment method is the first step in simplifying the buying process.",
      },
      {
        id: 6,
        question:
          "What is the second factor that can influence a person's likelihood to perform an impulse buy?",
        options: [
          "Descriptive product",
          "Following others",
          "Right esteem",
          "Psychological factors",
        ],
        correctAnswer: 1,
        explanation:
          "Following others is the second factor that can influence impulse buying.",
      },
      {
        id: 7,
        question:
          "What can make a potential customer decide to buy a product they did not originally intend to purchase?",
        options: [
          "A well-designed product display",
          "A simple and easy payment process",
          "A persuasive advertisement",
          "A testimonial from a satisfied customer",
        ],
        correctAnswer: 1,
        explanation:
          "A simple and easy payment process can make a customer decide to buy a product they did not originally intend to purchase.",
      },
    ],
  },
  {
    id: 10,
    title: "Intro to Investing Quiz",
    lessonTitle: "Intro to Investing",
    category: "investing",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "Which of the following is a common way to invest in the stock market?",
        options: [
          "Saving money in a savings account",
          "Investing in mutual funds",
          "Investing in stocks",
          "Investing in bonds",
        ],
        correctAnswer: 2,
        explanation:
          "Investing in stocks is a common way to invest in the stock market.",
      },
      {
        id: 2,
        question:
          "Which of the following is a good way to have an emergency fund?",
        options: [
          "Investing in stocks",
          "Saving money in a savings account",
          "Investing in bonds",
          "Investing in mutual funds",
        ],
        correctAnswer: 1,
        explanation:
          "Saving money in a savings account is a good way to have an emergency fund.",
      },
      {
        id: 3,
        question: "What is the difference between saving and investing?",
        options: [
          "Saving involves buying stocks, while investing involves saving money",
          "Investing involves buying stocks, while saving involves putting money in a savings account",
          "Saving is for short-term goals, while investing is for long-term goals",
          "Saving is for long-term goals, while investing is for short-term goals",
        ],
        correctAnswer: 2,
        explanation:
          "Saving is for short-term goals, while investing is for long-term goals.",
      },
      {
        id: 4,
        question: "What is the purpose of a pension fund?",
        options: [
          "To invest in stocks and bonds",
          "To help move funds from savers to borrowers",
          "To provide retirement savings for employees",
          "To provide retirement income for employees",
        ],
        correctAnswer: 2,
        explanation:
          "The purpose of a pension fund is to provide retirement savings for employees.",
      },
      {
        id: 5,
        question:
          "Which of the following is a more stable way to invest your money than stocks?",
        options: [
          "Investing in stocks",
          "Investing in mutual funds",
          "Investing in bonds",
          "Investing in hedge funds",
        ],
        correctAnswer: 2,
        explanation:
          "Investing in bonds is generally considered more stable than investing in stocks.",
      },
    ],
  },
  {
    id: 11,
    title: "Saving vs Spending Quiz",
    lessonTitle: "Saving vs Spending",
    category: "saving",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the purpose of money?",
        options: [
          "To exchange goods and services",
          "To save for future purchases",
          "To invest in stocks and bonds",
          "To donate to charity",
        ],
        correctAnswer: 0,
        explanation:
          "The primary purpose of money is to exchange goods and services.",
      },
      {
        id: 2,
        question: "What are some ways to save money?",
        options: [
          "Saving it in a piggy bank",
          "Saving it in a bank account",
          "Saving it in a jar",
          "Saving it in a safe",
        ],
        correctAnswer: 1,
        explanation:
          "Saving money in a bank account is a safe and effective way to save.",
      },
      {
        id: 3,
        question: "What is the difference between bartering and using money?",
        options: [
          "Bartering involves trading goods for services, while using money involves buying goods and services with money",
          "Bartering is more efficient than using money",
          "Bartering is less risky than using money",
          "Bartering is less convenient than using money",
        ],
        correctAnswer: 0,
        explanation:
          "Bartering is trading goods/services directly, while using money is buying with currency.",
      },
      {
        id: 4,
        question: "What are some things that people can do with money?",
        options: ["Save it", "Spend it", "Lend it", "All of the above"],
        correctAnswer: 3,
        explanation:
          "People can save, spend, lend, and do many things with money.",
      },
    ],
  },
  {
    id: 12,
    title: "Earning Money Quiz",
    lessonTitle: "Earning Money",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the game that YNAB kids played called?",
        options: ["Job Mash", "Money Match", "Dream Jobs", "Brainstorming"],
        correctAnswer: 0,
        explanation: "The game is called Job Mash.",
      },
      {
        id: 2,
        question: "What are some of the jobs that YNAB kids mentioned?",
        options: [
          "Lemonade stands, garage sales, walking dogs, delivering newspapers",
          "Doctors, fire fighters, and park rangers",
          "Soccer coach, police, and Dunkin' Donuts person",
          "All of the above",
        ],
        correctAnswer: 3,
        explanation:
          "YNAB kids mentioned a variety of jobs, including all of the above.",
      },
      {
        id: 3,
        question: "What can you do to earn money?",
        options: [
          "Sell items",
          "Start a business",
          "Making content",
          "Work in an office",
          "All of the above",
        ],
        correctAnswer: 4,
        explanation:
          "You can earn money in many ways, including all of the above.",
      },
    ],
  },
  {
    id: 13,
    title: "Giving and Sharing Quiz",
    lessonTitle: "Giving and Sharing",
    category: "giving",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What did Douglas's mother make for his class as a gift for his birthday?",
        options: [
          "Cupcakes with cheesecake filling",
          "A treasure chest filled with stuffed cupcakes",
          "A whole bunch of stuffed cupcakes to share with his class",
          "All of the above",
        ],
        correctAnswer: 3,
        explanation:
          "Douglas's mother made a whole bunch of stuffed cupcakes to share with his class, and they were kept in a treasure chest.",
      },
      {
        id: 2,
        question:
          "Why did Douglas decide to keep the stuffed cupcakes for himself?",
        options: [
          "Because they were delicious",
          "Because it was his birthday",
          "Because he didn't want to share with other people",
        ],
        correctAnswer: 2,
        explanation:
          "Douglas decided to keep the cupcakes for himself because he didn't want to share with others.",
      },
      {
        id: 3,
        question:
          "What did Douglas do with the stuffed cupcakes he kept in the treasure chest?",
        options: [
          "Ate them all",
          "Kept them in the treasure chest",
          "Shared them with his friends",
        ],
        correctAnswer: 1,
        explanation:
          "Douglas kept the cupcakes in the treasure chest instead of sharing them.",
      },
      {
        id: 4,
        question:
          "What lesson does Douglas want his audience to learn from his experience with the cupcakes?",
        options: [
          "Always save your treasure in a treasure chest",
          "Greed is good",
          "Generosity and sharing make others happy",
        ],
        correctAnswer: 2,
        explanation:
          "Douglas wants his audience to learn that generosity and sharing make others happy.",
      },
    ],
  },
  {
    id: 14,
    title: "Credit Scores Quiz",
    lessonTitle: "Credit Scores",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is a budget?",
        options: [
          "A plan for spending money on fun things",
          "A plan for limiting spending on fun things or wants to make sure you have enough money for necessary things",
          "A plan for increasing debt",
          "A plan for investing in the stock market",
        ],
        correctAnswer: 1,
        explanation:
          "A budget helps you limit spending on wants so you have enough for needs.",
      },
      {
        id: 2,
        question: "What is the 30-60-10 plan for students?",
        options: [
          "Saving 50%, spending 50%, and sharing 100% of their income",
          "Saving 30%, spending 60%, and sharing 10% of their income",
          "Saving 50%, spending 20%, and sharing 30% of their income",
          "Saving 70%, spending 30%, and sharing 0% of their income",
        ],
        correctAnswer: 1,
        explanation:
          "The 30-60-10 plan means saving 30%, spending 60%, and sharing 10%.",
      },
      {
        id: 3,
        question:
          'What does "sharing" mean in the context of the 30-60-10 plan?',
        options: [
          "Saving for a future purchase",
          "Giving money to a cause you care about",
          "Investing in a stock",
          "Borrowing money from friends or family",
        ],
        correctAnswer: 1,
        explanation: "Sharing means giving money to a cause you care about.",
      },
      {
        id: 4,
        question: "What is the purpose of the 30-60-10 plan?",
        options: [
          "To teach you how to budget and save money",
          "To encourage you to spend all of your money on fun things",
          "To help you pay off debt",
          "To prepare you for investing in the stock market",
        ],
        correctAnswer: 0,
        explanation: "The plan teaches you how to budget and save money.",
      },
      {
        id: 5,
        question: "How does the 30-60-10 plan help you as you grow older?",
        options: [
          "It teaches you how to manage your money well",
          "It helps you pay off debt and invest in the stock market",
          "It teaches you how to avoid spending too much on fun things",
          "It helps you plan for buying a house and paying for your children's education",
        ],
        correctAnswer: 0,
        explanation: "It teaches you how to manage your money well.",
      },
      {
        id: 6,
        question:
          "Why is it important to start budgeting and saving early in life?",
        options: [
          "Because you will have more money to spend on fun things",
          "Because you will have more money for unnecessary expenses",
          "Because it will help you prepare for the future",
          "Because it will teach you how to invest in the stock market",
        ],
        correctAnswer: 2,
        explanation: "Starting early helps you prepare for the future.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 15,
    title: "Intro to Investing (Playlist) Quiz",
    lessonTitle: "Intro to Investing (Playlist)",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the primary difference between stocks and bonds?",
        options: [
          "Stocks are a representation of ownership in a public company and bonds are a loan from a corporation or government",
          "Bonds are a representation of ownership in a public company and stocks are a loan from a corporation or government",
          "Bonds are a representation of ownership in a public company and stocks are a loan from a corporation or government",
          "Stocks and bonds are both essentially loans from a corporation or government",
        ],
        correctAnswer: 1,
        explanation:
          "Stocks represent ownership in a company, while bonds are loans to a corporation or government.",
      },
      {
        id: 2,
        question: "What are the three components of bonds?",
        options: [
          "Their interest rate, maturity date and par value amount",
          "Their dividend rate, maturity date and par value amount",
          "Their coupon rate, bond's maturity and par value amount",
          "Their dividend rate, coupon rate and par value amount",
        ],
        correctAnswer: 0,
        explanation:
          "The three components of bonds are interest rate, maturity date, and par value amount.",
      },
      {
        id: 3,
        question:
          "What is the role of financial intermediaries in a financial system?",
        options: [
          "To transfer funds from savers to borrowers",
          "To facilitate the exchange of assets between savers and borrowers",
          "To invest in securities on behalf of savers",
          "To provide credit to borrowers",
        ],
        correctAnswer: 0,
        explanation:
          "Financial intermediaries transfer funds from savers to borrowers.",
      },
      {
        id: 4,
        question:
          "What is the difference between simple and compound interest?",
        options: [
          "Simple interest is calculated based on the principal and interest accrued while compound interest is based on the principal only",
          "Compound interest is calculated based on the principal and interest accrued while simple interest is based on the principal only",
          "Simple interest is calculated on the principal amount of a loan or deposit while compound interest is calculated based on both the principal and interest",
          "Compound interest is calculated based on the principal and interest accrued while simple interest is calculated on the principal amount of a loan or deposit",
        ],
        correctAnswer: 2,
        explanation:
          "Simple interest is calculated on the principal only; compound interest is calculated on both principal and interest.",
      },
      {
        id: 5,
        question: "What is the formula for calculating simple interest?",
        options: [
          "A = P(1 + rt)",
          "A = P + rt",
          "A = P(1 + rt) + P",
          "A = P(1 + rt) + (P * r * t)",
        ],
        correctAnswer: 0,
        explanation: "The formula for simple interest is A = P(1 + rt).",
      },
      {
        id: 6,
        question: "What is a pension fund?",
        options: [
          "A type of investment where funds are invested in stocks, bonds and other financial assets",
          "A type of savings account where funds are invested in stocks, bonds and other financial assets",
          "A type of investment where funds are invested in a variety of stocks, bonds, and other financial assets",
          "A type of investment where funds are invested in a single stock or bond",
        ],
        correctAnswer: 2,
        explanation:
          "A pension fund invests in a variety of stocks, bonds, and other financial assets.",
      },
      {
        id: 7,
        question:
          "What is the best way to reduce risk when investing your money?",
        options: [
          "Invest in a single risky venture",
          "Invest in a diverse range of securities",
          "Invest all your money in bonds",
          "Invest all your money in stocks",
        ],
        correctAnswer: 1,
        explanation:
          "Diversification is the best way to reduce risk when investing.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 16,
    title: "Taxes and Your Paycheck Quiz",
    lessonTitle: "Taxes and Paychecks",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is the purpose of the space on a modern pay stub for vacation, sick, or personal time?",
        options: [
          "To track the hours worked by the employee",
          "To indicate the amount earned in the paycheck for vacation, sick, or personal time",
          "To show the total amount earned by the employee",
          "To calculate the net pay after deductions",
        ],
        correctAnswer: 1,
        explanation:
          "This space shows the amount earned for vacation, sick, or personal time.",
      },
      {
        id: 2,
        question:
          "What is the amount listed on a job posting as the amount made before taxes and deductions?",
        options: [
          "The amount after taxes and deductions",
          "The amount made per hour",
          "The annual salary",
          "The non-tax deductions",
        ],
        correctAnswer: 2,
        explanation:
          "The annual salary is the amount before taxes and deductions.",
      },
      {
        id: 3,
        question:
          "What is one example of a deduction that may be made from an employee's gross pay?",
        options: [
          "Health insurance premium",
          "Retirement savings contribution",
          "Taxes",
          "All of the above",
        ],
        correctAnswer: 0,
        explanation: "Health insurance premium is one example of a deduction.",
      },
      {
        id: 4,
        question: "What factors affect the amount of taxes you pay?",
        options: [
          "Your job's healthcare benefits",
          "The types of taxes and the percentage of your income they cost",
          "The specific amount deducted from your paycheck",
          "None of the above",
        ],
        correctAnswer: 1,
        explanation:
          "The types of taxes and their rates affect your total tax.",
      },
      {
        id: 5,
        question:
          "What are the three types of taxes mentioned in the transcript?",
        options: [
          "Federal income tax, state income tax, and sales tax",
          "Federal income tax, FICA medicare, and social security taxes",
          "Property tax, income tax, and capital gains tax",
          "Payroll tax, corporate tax, and estate tax",
        ],
        correctAnswer: 1,
        explanation:
          "Federal income tax, FICA medicare, and social security taxes are the three types mentioned.",
      },
      {
        id: 6,
        question:
          "What does FICA stand for, and what are the federal programs it funds?",
        options: [
          "FICA stands for Federal Insurance Contributions Act, which funds Social Security and Medicare.",
          "FICA stands for Federal Investment Credit Association, which funds education and job training.",
          "FICA stands for Federal Insurance Contributions Act, but the programs it funds are Social Security and Medicaid.",
          "FICA stands for Federal Income Contributions Act, which funds income-based assistance for low-income individuals.",
        ],
        correctAnswer: 0,
        explanation:
          "FICA stands for Federal Insurance Contributions Act and funds Social Security and Medicare.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 17,
    title: "Loans and Debt Quiz",
    lessonTitle: "Loans and Debt",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is the backbone of borrowing and investing in the world of finance?",
        options: [
          "Interest rates",
          "Principal",
          "Compound interest",
          "Economic factors",
        ],
        correctAnswer: 0,
        explanation:
          "Interest rates are fundamental to borrowing and investing.",
      },
      {
        id: 2,
        question: "What are the two main types of interest rates?",
        options: [
          "Simple and compound interest",
          "Principal and loan terms",
          "Economic factors and interest rates",
          "Interest rates and debt",
        ],
        correctAnswer: 0,
        explanation: "Simple and compound interest are the two main types.",
      },
      {
        id: 3,
        question: "What is the initial loan amount in loans?",
        options: [
          "Principle",
          "Interest rate",
          "Loan terms",
          "Economic factors",
        ],
        correctAnswer: 0,
        explanation: "The principal is the initial loan amount.",
      },
      {
        id: 4,
        question: "What is the cost of borrowing money in loans?",
        options: [
          "Interest rate",
          "Principle",
          "Loan terms",
          "Economic factors",
        ],
        correctAnswer: 0,
        explanation: "The interest rate is the cost of borrowing.",
      },
      {
        id: 5,
        question:
          "What is the potential return on investments in the world of finance?",
        options: [
          "Interest rates",
          "Compound interest",
          "Principal",
          "Economic factors",
        ],
        correctAnswer: 1,
        explanation:
          "Compound interest is the potential return on investments.",
      },
      {
        id: 6,
        question: "What is the loan agreement in loans?",
        options: [
          "Interest rate",
          "Principle",
          "Loan terms",
          "Economic factors",
        ],
        correctAnswer: 2,
        explanation: "Loan terms are the agreement details.",
      },
      {
        id: 7,
        question: "What is the key to understanding loans and debt?",
        options: [
          "Interest rates",
          "Principle",
          "Loan terms",
          "Economic factors",
        ],
        correctAnswer: 2,
        explanation:
          "Understanding loan terms is key to understanding loans and debt.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 18,
    title: "Retirement and Financial Independence Quiz",
    lessonTitle: "Retirement and Financial Independence",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What does the FIRE movement stand for?",
        options: [
          "Financial Aid for Retirees",
          "Financial Independence, Retire Early",
          "Financial Assistance for Students",
          "Financial Investment in Real Estate",
        ],
        correctAnswer: 1,
        explanation: "FIRE stands for Financial Independence, Retire Early.",
      },
      {
        id: 2,
        question:
          'What is the first key tenet of financial independence, commonly referred to as "FIRE"?',
        options: [
          "Spending more than your means",
          "Living below your means and practicing discipline",
          "Investing in high-risk stocks",
          "Saving for retirement only",
        ],
        correctAnswer: 1,
        explanation:
          "Living below your means and practicing discipline is the first key tenet.",
      },
      {
        id: 3,
        question: "What is frugal living?",
        options: [
          "Living frugally is only about having the smallest footprint possible",
          "Living frugally is about living the life you want to live",
          "Frugal living is not important for others",
          "Frugal living is only about minimalism",
        ],
        correctAnswer: 1,
        explanation: "Frugal living is about living the life you want to live.",
      },
      {
        id: 4,
        question:
          "What does the speaker suggest people do in order to live below their means and save a significant portion of their income?",
        options: [
          "Spend all their income on unnecessary expenses",
          "Save a huge proportion of their income towards their financial goals",
          "Live an extravagant lifestyle and never save money",
          "Invest all their savings in risky ventures",
        ],
        correctAnswer: 1,
        explanation:
          "The speaker suggests saving a huge proportion of income towards financial goals.",
      },
      {
        id: 5,
        question:
          "What is a main concern regarding the retirement savings strategy mentioned in the transcript?",
        options: [
          "Saving enough money for retirement",
          "Saving too much money and becoming a financial miser",
          "Saving too little money and not being financially independent",
          "Avoiding debt and building wealth",
        ],
        correctAnswer: 2,
        explanation:
          "A main concern is saving too little and not being financially independent.",
      },
      {
        id: 6,
        question:
          "What is the recommended savings rate to achieve financial goals?",
        options: ["25%", "50%", "70%", "90%"],
        correctAnswer: 1,
        explanation:
          "A 50% savings rate is recommended to achieve financial goals.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 1001,
    title: "Understanding Money & Your Relationship With It Quiz",
    lessonTitle: "Understanding Money & Your Relationship With It",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is the primary advice given to maintain a healthy relationship with money?",
        options: [
          "Make money the center of your life",
          "Make having more money the number one goal of your life",
          "Spend more to impress others",
          "Prioritize financial stability and savings",
        ],
        correctAnswer: 3,
        explanation:
          "Prioritizing financial stability and savings is key to a healthy relationship with money.",
      },
      {
        id: 2,
        question: "What is the main purpose of money according to the speaker?",
        options: [
          "To provide entertainment",
          "To be used as a tool to help serve others and fulfill personal goals",
          "To be hoarded for personal gain",
          "To be spent recklessly",
        ],
        correctAnswer: 1,
        explanation:
          "Money is a tool to help serve others and fulfill personal goals.",
      },
      {
        id: 3,
        question:
          "What is an important step to take to ensure your spending aligns with your values?",
        options: [
          "Review your credit card statements every month",
          "Set a budget and track your spending",
          "Only spend money on things you need",
          "Allocate all your income towards savings",
        ],
        correctAnswer: 1,
        explanation:
          "Setting a budget and tracking spending helps align spending with values.",
      },
      {
        id: 4,
        question: "What is an important step in developing financial literacy?",
        options: [
          "Avoiding discussions about money",
          "Reflecting on personal feelings about money",
          "Focusing solely on where money is coming from",
          "Ignoring sources of financial stress",
        ],
        correctAnswer: 1,
        explanation:
          "Reflecting on personal feelings about money is important for financial literacy.",
      },
      {
        id: 5,
        question: "What is the purpose of financial literacy?",
        options: [
          "To teach how to invest in risky stocks",
          "To help individuals manage their finances and reduce stress",
          "To encourage people to spend more money",
          "To provide information on how to make more money through illegal means",
        ],
        correctAnswer: 1,
        explanation:
          "Financial literacy helps individuals manage finances and reduce stress.",
      },
      {
        id: 6,
        question:
          "What is the primary focus of the speaker's advice in the transcript?",
        options: [
          "Setting high financial goals",
          "Avoiding disappointment in finances",
          "Injecting reality into expectations about finances",
          "Celebrating all the upside that better finances can bring",
        ],
        correctAnswer: 2,
        explanation:
          "Injecting reality into expectations is the primary focus.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 1002,
    title: "Budgeting Quiz",
    lessonTitle: "Budgeting",
    category: "budgeting",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is the best strategy for simplifying financial categories, according to the transcript?",
        options: [
          "Keeping all expenses in one category",
          "Simplifying categories as much as possible",
          "Assigning specific percentages to each category",
          "Creating complex sub-categories",
        ],
        correctAnswer: 1,
        explanation:
          "Simplifying categories as much as possible makes budgeting easier.",
      },
      {
        id: 2,
        question:
          "What category does the person use to describe their monthly expenses that stay the same price and need to be paid every month?",
        options: ["Entertainment", "Essentials", "Travel", "Investments"],
        correctAnswer: 1,
        explanation:
          "Essentials are monthly expenses that stay the same and must be paid.",
      },
      {
        id: 3,
        question:
          "What are some factors that the speaker considers when creating a budget that have worked consistently, even with changes in personal circumstances?",
        options: [
          "Avoiding credit card debt",
          "Creating a flexible budget",
          "Diversifying income sources",
          "Cutting all non-essential expenses",
        ],
        correctAnswer: 1,
        explanation: "A flexible budget works even as circumstances change.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 1003,
    title: "Banking & How To Use It Quiz",
    lessonTitle: "Banking & How To Use It",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What role do banks play in modern society?",
        options: [
          "Banks solely provide savings accounts",
          "Banks only offer digital transactions",
          "Banks have no significance in our daily lives",
          "Banks have no impact on the global economy",
        ],
        correctAnswer: 1,
        explanation:
          "Banks offer digital transactions and play a key role in modern society.",
      },
      {
        id: 2,
        question: "What is the primary function of a bank?",
        options: [
          "A place for people to socialize and make friends.",
          "A central hub for money flow and financial transactions.",
          "A government institution responsible for regulating financial markets.",
          "A place where people can store their personal belongings.",
        ],
        correctAnswer: 1,
        explanation:
          "The primary function of a bank is to serve as a central hub for money flow and financial transactions.",
      },
      {
        id: 3,
        question:
          "What is one way to ensure the security of your funds when depositing money into a bank account?",
        options: [
          "Keeping the money in a mattress",
          "Using sophisticated security measures employed by banks",
          "Storing the money in a physical safe at home",
          "Only depositing large amounts of money once a year",
        ],
        correctAnswer: 1,
        explanation:
          "Banks use sophisticated security measures to keep your funds safe.",
      },
      {
        id: 4,
        question:
          "What are the three main types of bank accounts and what is the primary purpose of each?",
        options: [
          "Savings account, checking account, and certificates of deposit; primarily used for long-term savings",
          "Credit card account, checking account, and savings account; primarily used for short-term spending and savings",
          "Checking account, savings account, and certificate of deposit; primarily used for medium-term savings",
          "Retirement account, savings account, and credit card; primarily used for long-term savings and debt repayment",
        ],
        correctAnswer: 1,
        explanation:
          "Credit card, checking, and savings accounts are primarily for short-term spending and savings.",
      },
      {
        id: 5,
        question:
          "What are the benefits of checking accounts and debit cards for managing your money?",
        options: [
          "They provide easy access to your money, but do not offer convenience for making purchases.",
          "They enable you to keep your money safe and provide a convenient way to make purchases without carrying cash.",
          "They only work for online transactions and require carrying cash for all other purchases.",
          "They do not allow you to access your money unless you have a physical bank branch nearby.",
        ],
        correctAnswer: 1,
        explanation:
          "Checking accounts and debit cards keep your money safe and make purchases convenient.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 1004,
    title: "Saving & Emergency Funds Quiz",
    lessonTitle: "Saving & Emergency Funds",
    category: "saving",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What type of account is recommended for keeping an emergency fund?",
        options: [
          "A high-yield savings account",
          "A money market account",
          "A checking account",
          "A CD account",
        ],
        correctAnswer: 0,
        explanation:
          "A high-yield savings account is recommended for emergency funds.",
      },
      {
        id: 2,
        question: "What is the primary purpose of an emergency fund?",
        options: [
          "To earn high interest rates",
          "To have a safety net for unexpected expenses",
          "To invest in stocks and bonds",
          "To donate to charity",
        ],
        correctAnswer: 1,
        explanation:
          "The primary purpose is to have a safety net for unexpected expenses.",
      },
      {
        id: 3,
        question:
          "What type of savings accounts is recommended by the speaker because they offer easy access to money and are not locked away like CD accounts or treasury bills?",
        options: [
          "High-yield savings accounts",
          "Money market accounts",
          "Certificates of Deposit (CD)",
          "Treasury bills",
        ],
        correctAnswer: 0,
        explanation:
          "High-yield savings accounts offer easy access and are not locked away.",
      },
      {
        id: 4,
        question:
          "What is one advantage of keeping your emergency funds in a high-yield savings account?",
        options: [
          "Higher interest rates",
          "Reduced temptation to spend on non-emergencies",
          "Immediate access to funds",
          "All of the above",
        ],
        correctAnswer: 1,
        explanation: "Reduced temptation to spend is a key advantage.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 1005,
    title: "Credit Scores & Credit Cards Quiz",
    lessonTitle: "Credit Scores & Credit Cards",
    category: "credit",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is the name of the company that generates the consumer credit score known as FICO?",
        options: [
          "Equifax",
          "Experian",
          "TransUnion",
          "Fair Isaac Corporation",
        ],
        correctAnswer: 3,
        explanation: "FICO stands for Fair Isaac Corporation.",
      },
      {
        id: 2,
        question:
          "Which two credit scores are mentioned as being widely used in the industry?",
        options: [
          "FICO score and Vantage score",
          "Equifax score and Experian score",
          "TransUnion score and Credit Karma score",
          "Bank of America score and Wells Fargo score",
        ],
        correctAnswer: 0,
        explanation: "FICO and Vantage scores are widely used.",
      },
      {
        id: 3,
        question: "What are the two major credit reporting agencies?",
        options: [
          "Experian and Equifax",
          "Equifax and Transunion",
          "Experian and Transunion",
          "Equifax and Transunion",
        ],
        correctAnswer: 1,
        explanation:
          "Equifax and Transunion are two major credit reporting agencies.",
      },
      {
        id: 4,
        question:
          "What is the lowest credit score range for FICO and Vantage scores?",
        options: ["350-400", "300-350", "250-300", "150-200"],
        correctAnswer: 1,
        explanation: "The lowest range for FICO and Vantage scores is 300-350.",
      },
      {
        id: 5,
        question:
          "According to the transcript, what is the risk category for A lenders moving up from a fair credit score range?",
        options: ["Low-risk", "Moderate-risk", "High-risk", "Unknown"],
        correctAnswer: 1,
        explanation:
          "A lenders moving up from fair are considered moderate-risk.",
      },
      {
        id: 6,
        question:
          "What does a credit score range of 670 to 739 indicate about the borrower's financial literacy?",
        options: [
          "High financial literacy",
          "Average financial literacy",
          "Below average financial literacy",
          "Poor financial literacy",
        ],
        correctAnswer: 1,
        explanation:
          "A score of 670 to 739 indicates average financial literacy.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 2006,
    title: "Retirement Planning & Withdrawal Strategies Quiz",
    lessonTitle: "Retirement Planning & Withdrawal Strategies",
    category: "retirement",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What is the main concern discussed regarding retirement?",
        options: [
          "Market crashes and inflation",
          "Investment strategies",
          "Savings and budgeting",
          "Social security",
        ],
        correctAnswer: 0,
        explanation:
          "Market crashes and inflation are major concerns for retirees.",
      },
      {
        id: 2,
        question:
          "What are some key rules or guidelines for retirement withdrawal strategies?",
        options: [
          "Investing in high-risk, high-return stocks",
          "Diversifying investments across different asset classes",
          "Withdrawing a fixed percentage of investments each year",
          "Consistently contributing to retirement accounts",
        ],
        correctAnswer: 1,
        explanation:
          "Diversification is a key guideline for safe retirement withdrawals.",
      },
      {
        id: 3,
        question:
          "What is not included in the safe withdrawal rate when applying a withdrawal strategy?",
        options: [
          "Tax implications",
          "Inflation rates",
          "Investment diversification",
          "Personal financial goals",
        ],
        correctAnswer: 0,
        explanation:
          "Tax implications are often not included in the safe withdrawal rate.",
      },
      {
        id: 4,
        question: "What is the most popular withdrawal strategy mentioned?",
        options: ["4% rule", "Trini", "Diversification", "Risk management"],
        correctAnswer: 0,
        explanation: "The 4% rule is a widely known withdrawal strategy.",
      },
      {
        id: 5,
        question:
          "Which of the following is the most important point in a sound retirement plan?",
        options: [
          "Only using one withdrawal strategy",
          "Using multiple withdrawal strategies",
          "Investing in high-risk, high-return assets",
          "Consistently saving a fixed amount of money each month",
        ],
        correctAnswer: 1,
        explanation:
          "Using multiple withdrawal strategies is important for a sound retirement plan.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 2007,
    title: "Social Security & Pensions Quiz",
    lessonTitle: "Social Security & Pensions",
    category: "retirement",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is a simple step to take to better understand your pension provider?",
        options: [
          "Ignore your pension provider's website",
          "Google the name of your pension provider",
          "Ask a friend or family member for information",
          "Visit a financial advisor",
        ],
        correctAnswer: 1,
        explanation:
          "Googling your pension provider is a simple way to learn more about them.",
      },
      {
        id: 2,
        question:
          "What can you do to manage your pension more effectively according to the conversation with Laura Steel from Nest Pensions?",
        options: [
          "Increase your contributions to your pension",
          "Review your pension documents regularly",
          "Consult with a financial advisor",
          "All of the above",
        ],
        correctAnswer: 3,
        explanation:
          "All of these actions help manage your pension more effectively.",
      },
      {
        id: 3,
        question:
          "What is an important aspect of financial literacy for individuals with multiple jobs?",
        options: [
          "Creating a budget",
          "Tracking down lost pots",
          "Managing debt",
          "Investing in stocks",
        ],
        correctAnswer: 1,
        explanation:
          "Tracking down lost pension pots is important for those with multiple jobs.",
      },
      {
        id: 4,
        question:
          "What would happen if you passed away before you could take your pension?",
        options: [
          "The money would be distributed to your beneficiaries or charity of your choice",
          "Your pension would be forfeited and cannot be claimed by anyone",
          "Your pension would be taken by the government for their use",
          "The money would be given to your estate",
        ],
        correctAnswer: 0,
        explanation:
          "If you pass away, your pension can go to your beneficiaries or a charity.",
      },
      {
        id: 5,
        question:
          "What is a good place to start looking for forgotten pension pots?",
        options: [
          "The money helper website",
          "The pension provider's website",
          "The government's financial assistance website",
          "None of the above",
        ],
        correctAnswer: 0,
        explanation:
          "The Money Helper website is a good resource for finding forgotten pension pots.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 2008,
    title: "Smart Spending in Retirement Quiz",
    lessonTitle: "Smart Spending in Retirement",
    category: "budgeting",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is one way to stretch a tiny retirement income discussed in the video?",
        options: [
          "Investing in high-risk stocks",
          "Cutting expenses and living below one's means",
          "Increasing one's salary through a second job",
          "Borrowing money from friends and family",
        ],
        correctAnswer: 1,
        explanation:
          "Cutting expenses and living below your means helps stretch a small retirement income.",
      },
      {
        id: 2,
        question:
          "What is the first strategy mentioned for managing personal finances?",
        options: [
          "Create a detailed budget",
          "Avoid tracking expenses",
          "Increase income without managing expenses",
          "Invest in high-risk investments",
        ],
        correctAnswer: 0,
        explanation:
          "Creating a detailed budget is the first strategy for managing finances.",
      },
      {
        id: 3,
        question:
          "What is the first step suggested in the transcript to help improve financial literacy?",
        options: [
          "Ignoring your spending habits",
          "Analyzing past expenses to identify patterns",
          "Blaming external factors for financial issues",
          "Making sudden, drastic changes in spending",
        ],
        correctAnswer: 1,
        explanation:
          "Analyzing past expenses helps identify spending patterns and improve financial literacy.",
      },
      {
        id: 4,
        question:
          "What is one way to identify and potentially reduce unnecessary expenses in your budget?",
        options: [
          "Ignoring your bank account and credit card statements",
          "Looking for one-off items and being honest with yourself about them",
          "Blaming others for your financial situation",
          "Cutting all discretionary spending",
        ],
        correctAnswer: 1,
        explanation:
          "Looking for one-off items and being honest helps reduce unnecessary expenses.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 2009,
    title: "Avoiding Scams & Financial Fraud Quiz",
    lessonTitle: "Avoiding Scams & Financial Fraud",
    category: "basics",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What is one of the tactics used by scammers to keep you isolated?",
        options: [
          "Providing financial education resources",
          "Encouraging you to talk to your brother about the situation",
          "Offering to help you with your financial problems",
          "Isolating you from your friends and family",
        ],
        correctAnswer: 3,
        explanation:
          "Scammers often try to isolate victims from friends and family.",
      },
      {
        id: 2,
        question:
          "What is the primary goal of scams when targeting individuals?",
        options: [
          "To make rational decisions",
          "To appeal to the individual's emotions",
          "To educate the public on financial literacy",
          "To create long-term investments",
        ],
        correctAnswer: 1,
        explanation: "Scams often appeal to emotions to manipulate victims.",
      },
      {
        id: 3,
        question:
          "What is the most common type of fraud mentioned in the transcript?",
        options: [
          "Credit card fraud",
          "Gift card fraud",
          "Payment method fraud",
          "Savings fraud",
        ],
        correctAnswer: 1,
        explanation: "Gift card fraud is a common type of scam.",
      },
      {
        id: 4,
        question:
          "What are some signs of financial fraud or scams to be aware of?",
        options: [
          "Slowing down phone calls",
          "Requesting money through Bitcoin or gift cards",
          "Ignoring phone calls from unknown people",
          "All of the above",
        ],
        correctAnswer: 3,
        explanation: "All of these can be signs of financial fraud or scams.",
      },
    ],
    comingSoon: false,
  },
  {
    id: 2010,
    title: "Healthcare and Long-Term Financial Planning Quiz",
    lessonTitle: "Healthcare and Long-Term Financial Planning",
    category: "retirement",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question:
          "What does Medicare usually cover for nursing home care, in-home care, or assisted living?",
        options: [
          "All expenses",
          "Short-term care only",
          "Long-term care only",
          "Partial expenses",
        ],
        correctAnswer: 1,
        explanation:
          "Medicare usually covers only short-term care for these services.",
      },
      {
        id: 2,
        question: "What does long-term care insurance typically not cover?",
        options: [
          "Short-term nursing home stays",
          "Long-term nursing home stays",
          "Chronic illnesses",
          "All of the above",
        ],
        correctAnswer: 0,
        explanation:
          "Long-term care insurance typically does not cover short-term nursing home stays.",
      },
      {
        id: 3,
        question: "What is the primary role of long-term care insurance?",
        options: [
          "To cover short-term medical costs",
          "To cover long-term care costs that Medicare doesn't cover",
          "To provide retirement income",
          "To pay for medical expenses incurred during travel",
        ],
        correctAnswer: 1,
        explanation:
          "Long-term care insurance is designed to cover costs that Medicare does not.",
      },
      {
        id: 4,
        question:
          "What can help lower the cost of long-term care insurance premiums?",
        options: [
          "Buying long-term care insurance at an older age",
          "Buying long-term care insurance as early as possible",
          "Choosing a higher monthly premium",
          "Waiting until retirement to buy long-term care insurance",
        ],
        correctAnswer: 1,
        explanation:
          "Buying long-term care insurance early can help lower premiums.",
      },
    ],
    comingSoon: false,
  },
];

const QuizPage = () => {
  const { userProfile, getLessonVideoProgress, updateQuizScore } = useUser();
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizList, setQuizList] = useState(() => {
    const saved = localStorage.getItem("quizList");
    return saved ? JSON.parse(saved) : quizzes;
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Get lesson title from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lessonTitle = params.get("lesson");
    if (lessonTitle && !selectedQuiz) {
      // Find the quiz for this lesson
      const quiz = quizList.find((q) => q.lessonTitle === lessonTitle);
      if (quiz) {
        setSelectedQuiz(quiz);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResults(false);
        setQuizStarted(true);
        window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line
  }, [location.search, quizList]);

  useEffect(() => {
    localStorage.setItem("quizList", JSON.stringify(quizList));
  }, [quizList]);

  // Get current age group lessons
  const currentAgeGroup = userProfile?.currentAgeGroup || "kids";
  const lessons = lessonsData[currentAgeGroup] || [];

  // Build quizzes for current age group
  const quizzesForAgeGroup = lessons.map((lesson) => {
    // Try to find a quiz for this lesson
    const quiz = quizList.find((q) => q.lessonTitle === lesson.title);
    if (quiz) return quiz;
    // Otherwise, create a Coming Soon quiz
    return {
      id: `coming-soon-${lesson.id}`,
      title: `${lesson.title} Quiz`,
      lessonTitle: lesson.title,
      category: lesson.category,
      completed: false,
      score: null,
      questions: [],
      comingSoon: true,
    };
  });

  // Sort completed quizzes to show most recently completed first
  const completedQuizzesFromList = quizList.filter(
    (q) =>
      q.completed && lessons.some((lesson) => lesson.title === q.lessonTitle)
  );
  const incompleteQuizzesFromList = quizList.filter(
    (q) =>
      !q.completed && lessons.some((lesson) => lesson.title === q.lessonTitle)
  );

  // Combine: completed quizzes (in order from quizList) + incomplete quizzes (in lesson order)
  const completedQuizzes = completedQuizzesFromList;
  const incompleteQuizzes =
    incompleteQuizzesFromList.length > 0
      ? incompleteQuizzesFromList
      : quizzesForAgeGroup.filter((q) => !q.completed);

  const startQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(true);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      // Calculate score and mark quiz as completed
      const score = calculateScore();
      setQuizList((prev) => {
        const updatedList = prev.map((q) =>
          q.id === selectedQuiz.id
            ? {
                ...q,
                completed: true,
                score: q.score ? Math.max(q.score, score) : score, // Keep the highest score
              }
            : q
        );
        // Move the retaken quiz to the front of the completed list
        const retakenQuiz = updatedList.find((q) => q.id === selectedQuiz.id);
        if (retakenQuiz && retakenQuiz.completed) {
          // Remove from current position and add to front
          const filteredList = updatedList.filter(
            (q) => q.id !== selectedQuiz.id
          );
          return [retakenQuiz, ...filteredList];
        }
        return updatedList;
      });
      // Update quizScores in userProfile
      updateQuizScore(userProfile.currentAgeGroup, selectedQuiz.id, score);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  useEffect(() => {
    // Find the first unlocked quiz (not completed, but now available)
    const unlockedQuiz = incompleteQuizzes.find((quiz) => {
      const lesson = lessons.find(l => l.title === quiz.lessonTitle);
      if (!lesson) return false;
      const videoProgress = getLessonVideoProgress(
        currentAgeGroup,
        lesson.id,
        lesson.videos?.length || 0
      );
      return videoProgress.completed === videoProgress.total && videoProgress.total > 0;
    });

    if (unlockedQuiz && quizList[0]?.id !== unlockedQuiz.id) {
      setQuizList((prev) => {
        const filtered = prev.filter(q => q.id !== unlockedQuiz.id);
        return [unlockedQuiz, ...filtered];
      });
    }
    // eslint-disable-next-line
  }, [incompleteQuizzes, lessons, currentAgeGroup]);

  useEffect(() => {
    // Find all quizzes whose lessons are completed
    const completedLessonQuizzes = quizList.filter((quiz) => {
      const lesson = lessons.find(l => l.title === quiz.lessonTitle);
      if (!lesson) return false;
      const videoProgress = getLessonVideoProgress(
        currentAgeGroup,
        lesson.id,
        lesson.videos?.length || 0
      );
      return videoProgress.completed === videoProgress.total && videoProgress.total > 0;
    });
    if (completedLessonQuizzes.length > 0) {
      setQuizList((prev) => {
        const filteredList = prev.filter(q => !completedLessonQuizzes.some(cq => cq.id === q.id));
        return [...completedLessonQuizzes, ...filteredList];
      });
    }
    // eslint-disable-next-line
  }, [lessons, quizList, currentAgeGroup]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Quizzes Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Please set up your profile to continue
          </p>
          <Button onClick={() => navigate("/setup")} variant="hero" size="lg">
            Set Up Profile
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (selectedQuiz && quizStarted) {
    const currentQ = selectedQuiz.questions[currentQuestion];
    const progress =
      ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    if (showResults) {
      const score = calculateScore();
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center animate-scale-in">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-warning mx-auto mb-4" />
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                  Quiz Complete!
                </h2>
                <p className="text-muted-foreground">
                  You scored {score}% on "{selectedQuiz.title}"
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {selectedQuiz.questions.map((question: any, index: number) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <Card key={question.id} className="p-4 text-left">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            {question.question}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your answer: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-success mb-2">
                              Correct answer:{" "}
                              {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="flex-1"
                >
                  Back to Quizzes
                </Button>
                <Button
                  onClick={() => startQuiz(selectedQuiz)}
                  variant="hero"
                  className="flex-1"
                >
                  Retake Quiz
                </Button>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 animate-fade-in">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{selectedQuiz.title}</h2>
                <Button variant="ghost" onClick={resetQuiz}>
                  ✕
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Question {currentQuestion + 1} of{" "}
                    {selectedQuiz.questions.length}
                  </span>
                  <span>
                    <Clock className="w-3 h-3 inline mr-1" />
                    No time limit
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium text-foreground">
                {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-primary bg-primary text-white"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === index && "✓"}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="w-full"
                variant="hero"
              >
                {currentQuestion < selectedQuiz.questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Knowledge Quizzes
          </h1>
          <p className="text-xl text-muted-foreground">
            Test what you've learned from{" "}
            {formatAgeGroupLabel(userProfile.currentAgeGroup)} Lessons
          </p>
        </div>

        {/* Quizzes To Do */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            Quizzes To Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incompleteQuizzes.map((quiz, index) => {
              const lesson = lessons.find((l) => l.title === quiz.lessonTitle);
              let isCompleted = false;
              if (lesson) {
                const videoProgress = getLessonVideoProgress(
                  currentAgeGroup,
                  lesson.id,
                  lesson.videos?.length || 0
                );
                isCompleted =
                  videoProgress.completed === videoProgress.total &&
                  videoProgress.total > 0;
              }
              const comingSoon = !isCompleted;

              return (
                <Card
                  key={quiz.id}
                  className={`card-interactive animate-fade-in h-full flex flex-col ${
                    comingSoon ? "opacity-60" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Badge
                        variant="default"
                        className="bg-primary text-white"
                      >
                        To Do
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-medium text-foreground">
                          {quiz.questions.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Questions
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {capitalizeFirst(quiz.category)}
                      </p>
                    </div>
                    <Button
                      onClick={() => startQuiz(quiz)}
                      variant="hero"
                      className="w-full mt-4"
                      disabled={comingSoon}
                    >
                      {comingSoon ? "Coming Soon" : "Start Quiz"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Completed Quizzes */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-success" />
            Completed Quizzes
          </h2>

          {completedQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedQuizzes.map((quiz, index) => (
                <Card
                  key={quiz.id}
                  className="card-interactive animate-fade-in border-success/20 bg-success/5 h-full flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="default" className="bg-success">
                        Completed
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">
                          {quiz.score}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Score
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {capitalizeFirst(quiz.category)}
                      </p>
                    </div>
                    <Button
                      onClick={() => startQuiz(quiz)}
                      variant="outline"
                      className="w-full mt-4"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No completed quizzes yet. Complete some lessons first!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
