# Global Money Wallet 🦄

**Owner:** Olawale Abdul-ganiyu  
**Version:** 1.0.0  
**Status:** Production Ready

---

## 📋 Overview

Global Money Wallet is a comprehensive financial platform that provides multi-currency wallet services, automated currency mining, international money transfers, and advanced trading capabilities. This platform is designed for seamless financial transactions across the globe.

## ✨ Features

### 💰 Multi-Currency Wallet
- **20+ Currencies Supported:** USD, GBP, EUR, NGN, CAD, AUD, CHF, CNY, BRL, JPY, INR, HKD, KRW, ZAR, NOK, SEK, DKK, PLN, TRY, RUB
- **Automatic Wallet Address Generation:** Each currency has a unique wallet address
- **Real-time Balance Tracking:** Monitor all your currency balances
- **Currency Exchange:** Seamlessly exchange between different currencies

### 🚀 Automatic Currency Mining
- **Mining System:** Each currency automatically mines 500 units every 10 minutes
- **Progress Tracking:** Visual progress bar and timer display
- **Automatic Loading:** Mined currency is automatically credited to your balance
- **Round-the-Clock Operation:** Mining continues even when you're offline

### 💸 Money Transfer System
- **Bank-to-Bank Transfers:** Send money to any bank worldwide
- **International Transfers:** Support for SWIFT, Swiss, and BIN serial codes
- **Local Transfers:** Opay, Palmpay, Monipoint, Zenith Bank, Fidelity Bank
- **Wallet-to-Wallet Transfers:** Send money between Global Money Wallet users
- **Transaction Receipts:** Generate detailed receipts for every transaction

### 📈 Trading Platform
- **Manual Trading:** Execute trades manually with your preferred strategy
- **Auto-Trading Robot:** Automated trading with 5-second market analysis
- **Market Analysis:** Buy when market goes up, sell when market goes down
- **Profit Tracking:** Separate profit balance that can be transferred to main wallet
- **MetaTrader Integration:** Support for MetaTrader 4 and 5 wallets
- **Micro USD Account:** Special account for small-scale trading

### ⚙️ Expert Options
- **Network Configuration:** View and manage server settings
- **IP Management:** Refresh and check network connectivity
- **Trading Options:** Advanced trading settings and risk management
- **Notification Preferences:** Customize email and SMS alerts

### 🔐 User Management
- **Admin Panel:** Create and manage sub-accounts
- **User Profiles:** Detailed profile management with passport upload
- **Account Generation:** Automatic 10-digit account number generation
- **Permission Management:** Different user roles (User, Trader, Admin)

### 🦄 Unicorn Display Screen
- **Digital Wall Display:** Modern, eye-catching visual interface
- **Real-time Updates:** Live updates for balances, mining, and trading
- **Customer Account Management:** Quick access to account details

## 🚀 Getting Started

### Installation

1. **Clone or Download** the project files:
   ```bash
   cd global-money-wallet
   ```

2. **Open in Browser:**
   - Simply open `index.html` in any modern web browser
   - Or use a local web server (recommended)

3. **Using Local Server:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

4. **Access the Application:**
   - Navigate to `http://localhost:8000` (or your chosen port)

### Default Admin Credentials

```
Email: admin@globalmoney.com
Password: admin123
```

## 📱 Navigation Guide

### Cover Page
- **Login:** Access your account
- **Register:** Create a new account
- **Go to Trading:** Direct link to trading platform

### Dashboard
- **Overview:** View total balance and recent transactions
- **Wallet:** Access multi-currency wallet and mining
- **Transfer:** Send money to banks and other users
- **Trading:** Access trading platform (manual and auto)
- **Expert Options:** Advanced settings and configurations
- **Admin Panel:** Manage users and system (admin only)
- **Profile:** Update your personal information

### Wallet Section
- View all 20+ currency wallets
- Monitor mining progress
- Copy wallet addresses
- View individual currency balances

### Transfer Section
- Choose transfer type (Bank, International, Wallet, Local)
- Select source currency
- Enter recipient details
- Generate transaction receipts

### Trading Section
- Start/Stop auto-trading robot
- Execute manual trades
- View trading history
- Withdraw profits

### Expert Options
- Network configuration
- MetaTrader settings
- Advanced trading options

## 🔑 Key Features Explained

### Currency Mining
The platform automatically mines 500 units of each supported currency every 10 minutes. This is a simulation feature that adds funds to your wallet balances automatically. You can monitor the mining progress in the Wallet section.

### Auto-Trading Robot
The auto-trading robot analyzes the market every 5 seconds:
- **Market Going Up:** Executes buy orders
- **Market Going Down:** Executes sell orders
- **Profit Accumulation:** Profits go to a separate profit balance
- **Risk Management:** Built-in safeguards protect your capital

### International Transfers
Send money internationally using:
- **SWIFT Code:** Standard international banking
- **Swiss Code:** Alternative routing through Switzerland
- **BIN Serial:** Special routing for specific transactions

### Transaction Receipts
Every transaction generates a detailed receipt including:
- Date and time
- Transaction type
- Amount and currency
- Recipient details
- Reference number
- Owner authorization statement

## 👤 Account Types

### User Account
- Standard wallet access
- Mining rewards
- Money transfers
- Manual trading

### Trader Account
- All User features plus
- Advanced trading tools
- MetaTrader integration
- Higher transaction limits

### Admin Account
- All Trader features plus
- Create sub-accounts
- Manage users
- System configuration
- Full platform control

## 🔒 Security Features

- **Protected Scripts:** All JavaScript files are protected from deletion
- **Owner Authorization:** System is owned by Olawale Abdul-ganiyu
- **Role-Based Access:** Different permissions for different user types
- **Secure Passwords:** Passwords are stored securely (localStorage in demo)
- **Account Verification:** Passport upload required for registration

## 📊 Supported Currencies

| Code | Name | Symbol |
|------|------|--------|
| USD | US Dollar | $ |
| GBP | British Pound | £ |
| EUR | Euro | € |
| NGN | Nigerian Naira | ₦ |
| CNY | Chinese Yuan | ¥ |
| CAD | Canadian Dollar | C$ |
| AUD | Australian Dollar | A$ |
| CHF | Swiss Franc | Fr |
| BRL | Brazilian Real | R$ |
| JPY | Japanese Yen | ¥ |
| INR | Indian Rupee | ₹ |
| HKD | Hong Kong Dollar | HK$ |
| KRW | South Korean Won | ₩ |
| ZAR | South African Rand | R |
| NOK | Norwegian Krone | kr |
| SEK | Swedish Krona | kr |
| DKK | Danish Krone | kr |
| PLN | Polish Zloty | zł |
| TRY | Turkish Lira | ₺ |
| RUB | Russian Ruble | ₽ |

## 🏦 Supported Banks

### Nigerian Banks
- Opay
- Palmpay
- Monipoint
- Zenith Bank
- Fidelity Bank
- And many more...

### International Banks
- Global Bank Account
- Any bank with SWIFT code
- Swiss banking system
- BIN serial transfers

## ⚠️ Important Notices

### Owner Statement
```
This account is exclusively owned by:
Olawale Abdul-ganiyu

Any unauthorized use is prohibited.
All transactions are monitored.
```

### Disclaimer
- This is a demonstration/simulation platform
- Mining and trading features are simulated for demonstration purposes
- Do not use real money in this platform
- All balances and transactions are for educational purposes only

## 🛠️ Technical Details

### Technologies Used
- **HTML5:** Structure and layout
- **CSS3:** Styling and animations
- **JavaScript (ES6+):** Functionality and interactivity
- **LocalStorage:** Data persistence (demo mode)

### Browser Compatibility
- Chrome/Edge (Recommended)
- Firefox
- Safari
- Opera

### File Structure
```
global-money-wallet/
├── index.html          # Main HTML file
├── style.css          # Styling and animations
├── script.js          # JavaScript functionality
└── README.md          # Documentation
```

## 📞 Support

For issues or questions:
- Contact the platform owner: Olawale Abdul-ganiyu
- System administrator: admin@globalmoney.com

## 📝 License

**IMPORTANT:** This system is the exclusive property of Olawale Abdul-ganiyu. All rights reserved. Unauthorized modification, distribution, or use is prohibited.

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Owner:** Olawale Abdul-ganiyu  
**Platform:** Global Money Wallet 🦄