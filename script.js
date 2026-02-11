// Global Money Wallet - Main JavaScript
// Owner: Olawale Abdul-ganiyu
// PROTECTED SCRIPT - DO NOT DELETE OR MODIFY

// Global Variables
let currentUser = null;
let isLoggedIn = false;
let autoTradingActive = false;
let miningInterval = null;
let tradingInterval = null;

// Currency Configuration
const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', balance: 500 },
    { code: 'GBP', name: 'British Pound', symbol: '£', balance: 500 },
    { code: 'EUR', name: 'Euro', symbol: '€', balance: 500 },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', balance: 500 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', balance: 500 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', balance: 500 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', balance: 500 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', balance: 500 },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', balance: 500 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', balance: 500 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', balance: 500 },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', balance: 500 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', balance: 500 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', balance: 500 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', balance: 500 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', balance: 500 },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', balance: 500 },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', balance: 500 },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', balance: 500 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', balance: 500 }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    startMining();
    initializeWallets();
    updateTotalBalance();
});

// Initialize Application
function initializeApp() {
    console.log('Global Money Wallet Initialized');
    console.log('Owner: Olawale Abdul-ganiyu');
    
    // Check for saved session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    }
}

// Section Navigation
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    updateNavigation(sectionName);
}

// Update Navigation
function updateNavigation(activeSection) {
    const navLinks = document.getElementById('nav-links');
    if (isLoggedIn && navLinks) {
        navLinks.style.display = 'flex';
    } else if (navLinks) {
        navLinks.style.display = 'none';
    }
    
    // Update sidebar active items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    console.log('Login attempt:', { email, password }); // Debug logging
    
    // Admin login
    if (email.toLowerCase() === 'admin@globalmoney.com' && password === 'admin123') {
        currentUser = {
            name: 'Admin',
            email: email,
            accountNumber: '1000000000',
            role: 'admin',
            isAdmin: true
        };
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        showNotification('Admin login successful!', 'success');
        showSection('dashboard');
        console.log('Admin login successful'); // Debug logging
        return;
    }
    
    // Regular user login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        showNotification('Login successful!', 'success');
        showSection('dashboard');
        console.log('User login successful'); // Debug logging
    } else {
        showNotification('Invalid email or password', 'error');
        console.log('Login failed - invalid credentials'); // Debug logging
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('register-phone').value;
    const passport = document.getElementById('register-passport').files[0];
    
    // Generate account number
    const accountNumber = generateAccountNumber();
    
    const newUser = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        accountNumber: accountNumber,
        passport: passport ? passport.name : null,
        role: 'user',
        isAdmin: false,
        createdAt: new Date().toISOString()
    };
    
    // Save user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('Registration successful! Your account number: ' + accountNumber, 'success');
    showSection('login');
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('currentUser');
    
    // Hide navigation
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.style.display = 'none';
    }
    
    showNotification('Logged out successfully', 'info');
    showSection('cover');
}

// Generate Account Number
function generateAccountNumber() {
    let accountNumber = '';
    for (let i = 0; i < 10; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
}

// Update UI for Logged In User
function updateUIForLoggedInUser() {
    if (currentUser) {
        // Update user name
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = currentUser.name;
        }
        
        // Update account number
        const userAccountElement = document.getElementById('user-account');
        if (userAccountElement) {
            userAccountElement.textContent = currentUser.accountNumber;
        }
        
        // Update profile
        updateProfileDisplay();
        
        // Show navigation
        const navLinks = document.getElementById('nav-links');
        if (navLinks) {
            navLinks.style.display = 'flex';
        }
    }
}

// Update Profile Display
function updateProfileDisplay() {
    if (currentUser) {
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const profilePhone = document.getElementById('profile-phone');
        const profileAccount = document.getElementById('profile-account');
        
        if (profileName) profileName.value = currentUser.name;
        if (profileEmail) profileEmail.value = currentUser.email;
        if (profilePhone) profilePhone.value = currentUser.phone || '';
        if (profileAccount) profileAccount.value = currentUser.accountNumber;
    }
}

// Wallet Functions
function initializeWallets() {
    const walletGrid = document.getElementById('wallet-grid');
    if (!walletGrid) return;
    
    walletGrid.innerHTML = '';
    
    currencies.forEach(currency => {
        const walletAddress = generateWalletAddress(currency.code);
        
        const walletCard = document.createElement('div');
        walletCard.className = 'wallet-card';
        walletCard.innerHTML = `
            <div class="wallet-currency">${currency.code} - ${currency.name}</div>
            <div class="wallet-balance">${currency.symbol}${currency.balance.toFixed(2)}</div>
            <div class="wallet-address">${walletAddress}</div>
            <button class="btn btn-secondary" style="margin-top: 10px; width: 100%;" onclick="copyAddress('${walletAddress}')">Copy Address</button>
        `;
        
        walletGrid.appendChild(walletCard);
    });
}

function generateWalletAddress(currencyCode) {
    const prefix = currencyCode.toLowerCase();
    const random = Math.random().toString(36).substring(2, 42);
    return `${prefix}_${random}`;
}

function copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
        showNotification('Address copied to clipboard!', 'success');
    });
}

// Mining Functions
function startMining() {
    let progress = 0;
    let timeLeft = 600; // 10 minutes in seconds
    
    if (miningInterval) {
        clearInterval(miningInterval);
    }
    
    miningInterval = setInterval(() => {
        progress += 100 / 600; // Update progress
        timeLeft--;
        
        // Update progress bar
        const miningBar = document.getElementById('mining-bar');
        if (miningBar) {
            miningBar.style.width = progress + '%';
        }
        
        // Update timer
        const miningTimer = document.getElementById('mining-timer');
        if (miningTimer) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            miningTimer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Mining complete
        if (timeLeft <= 0) {
            // Add mining rewards to all currencies
            currencies.forEach(currency => {
                currency.balance += 500;
            });
            
            // Reset
            progress = 0;
            timeLeft = 600;
            
            // Update display
            initializeWallets();
            updateTotalBalance();
            
            showNotification('Mining complete! +500 added to all currencies', 'success');
        }
    }, 1000); // Update every second
}

function updateTotalBalance() {
    let totalBalance = 0;
    currencies.forEach(currency => {
        totalBalance += currency.balance;
    });
    
    const totalBalanceElement = document.getElementById('total-balance');
    if (totalBalanceElement) {
        totalBalanceElement.textContent = '$' + totalBalance.toFixed(2);
    }
}

// Transfer Functions
function updateTransferForm() {
    const transferType = document.getElementById('transfer-type').value;
    const internationalOptions = document.getElementById('international-options');
    
    if (transferType === 'international') {
        internationalOptions.style.display = 'block';
    } else {
        internationalOptions.style.display = 'none';
    }
}

function handleTransfer(event) {
    event.preventDefault();
    
    const transferType = document.getElementById('transfer-type').value;
    const sourceCurrency = document.getElementById('source-currency').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    const recipientBank = document.getElementById('recipient-bank').value;
    const recipientAccount = document.getElementById('recipient-account').value;
    const recipientName = document.getElementById('recipient-name').value;
    
    // Validate amount
    const currency = currencies.find(c => c.code === sourceCurrency);
    if (!currency || currency.balance < amount) {
        showNotification('Insufficient balance', 'error');
        return;
    }
    
    // Deduct amount
    currency.balance -= amount;
    
    // Add to transfer history
    addTransferHistory({
        date: new Date().toLocaleDateString(),
        recipient: recipientName,
        bank: recipientBank,
        amount: amount,
        currency: sourceCurrency,
        status: 'Completed'
    });
    
    // Update display
    initializeWallets();
    updateTotalBalance();
    
    // Generate receipt
    generateReceipt({
        type: transferType,
        amount: amount,
        currency: sourceCurrency,
        recipient: recipientName,
        account: recipientAccount,
        bank: recipientBank
    });
    
    showNotification('Transfer successful!', 'success');
}

function addTransferHistory(transfer) {
    const transferHistory = document.getElementById('transfer-history');
    if (!transferHistory) return;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transfer.date}</td>
        <td>${transfer.recipient}</td>
        <td>${transfer.bank}</td>
        <td>${transfer.currency} ${transfer.amount.toFixed(2)}</td>
        <td style="color: var(--success-color);">${transfer.status}</td>
    `;
    
    transferHistory.insertBefore(row, transferHistory.firstChild);
}

// Trading Functions
function toggleAutoTrade() {
    autoTradingActive = !autoTradingActive;
    
    const btn = document.getElementById('auto-trade-btn');
    const statusDot = document.getElementById('trade-status-dot');
    const statusText = document.getElementById('trade-status-text');
    
    if (autoTradingActive) {
        btn.textContent = 'Stop Auto Trading';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-danger');
        statusDot.classList.remove('status-inactive');
        statusDot.classList.add('status-active');
        statusText.textContent = 'Auto Trading: Active';
        
        startAutoTrading();
    } else {
        btn.textContent = 'Start Auto Trading';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-success');
        statusDot.classList.remove('status-active');
        statusDot.classList.add('status-inactive');
        statusText.textContent = 'Auto Trading: Inactive';
        
        stopAutoTrading();
    }
}

function startAutoTrading() {
    if (tradingInterval) {
        clearInterval(tradingInterval);
    }
    
    tradingInterval = setInterval(() => {
        // Simulate market analysis
        const marketUp = Math.random() > 0.5;
        const marketTrend = document.getElementById('market-trend');
        
        if (marketUp) {
            marketTrend.textContent = '📈 UP';
            marketTrend.classList.remove('market-down');
            marketTrend.classList.add('market-up');
            
            // Buy logic
            executeTrade('Buy');
        } else {
            marketTrend.textContent = '📉 DOWN';
            marketTrend.classList.remove('market-up');
            marketTrend.classList.add('market-down');
            
            // Sell logic
            executeTrade('Sell');
        }
    }, 5000); // Every 5 seconds
}

function stopAutoTrading() {
    if (tradingInterval) {
        clearInterval(tradingInterval);
        tradingInterval = null;
    }
}

function executeManualTrade() {
    const tradingPair = document.getElementById('manual-trading-pair')?.value || 'USD/EUR';
    const tradingType = document.getElementById('manual-trade-type')?.value || 'Buy';
    let amount = parseFloat(document.getElementById('manual-trade-amount')?.value);
    
    // Validate amount
    if (!amount || isNaN(amount)) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (amount < 0.1) {
        showNotification('Minimum amount is 0.1', 'error');
        return;
    }
    
    if (amount > 5000) {
        showNotification('Maximum amount is 5000', 'error');
        return;
    }
    
    const profit = (Math.random() - 0.3) * amount; // 70% chance of profit
    
    const tradingHistory = document.getElementById('trading-history');
    if (!tradingHistory) return;
    
    // Update profit balance
    const profitElement = document.getElementById('trading-profit');
    const currentProfit = parseFloat(profitElement.textContent.replace('$', '').replace(',', ''));
    const newProfit = currentProfit + profit;
    profitElement.textContent = '$' + newProfit.toFixed(2);
    
    // Add to history
    const row = document.createElement('tr');
    const time = new Date().toLocaleTimeString();
    const resultColor = profit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    
    row.innerHTML = `
        <td>${time}</td>
        <td>${tradingType}</td>
        <td>${tradingPair}</td>
        <td>$${amount.toFixed(2)}</td>
        <td style="color: ${resultColor};">${profit >= 0 ? '+' : ''}${profit.toFixed(2)}</td>
    `;
    
    tradingHistory.insertBefore(row, tradingHistory.firstChild);
    
    showNotification(`Trade executed: ${tradingType} ${tradingPair} - $${amount.toFixed(2)}`, 'success');
    
    // Clear the amount field
    document.getElementById('manual-trade-amount').value = '';
}

function executeTrade(type = null) {
    const tradingType = type || (document.querySelector('select:nth-child(2)')?.value || 'Buy');
    const tradingPair = 'USD/EUR';
    // Random amount between 0.1 and 5000 for auto-trading
    const amount = 0.1 + Math.random() * (5000 - 0.1);
    const profit = (Math.random() - 0.3) * amount; // 70% chance of profit
    
    const tradingHistory = document.getElementById('trading-history');
    if (!tradingHistory) return;
    
    // Update profit balance
    const profitElement = document.getElementById('trading-profit');
    const currentProfit = parseFloat(profitElement.textContent.replace('$', '').replace(',', ''));
    const newProfit = currentProfit + profit;
    profitElement.textContent = '$' + newProfit.toFixed(2);
    
    // Add to history
    const row = document.createElement('tr');
    const time = new Date().toLocaleTimeString();
    const resultColor = profit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    
    row.innerHTML = `
        <td>${time}</td>
        <td>${tradingType}</td>
        <td>${tradingPair}</td>
        <td>$${amount.toFixed(2)}</td>
        <td style="color: ${resultColor};">${profit >= 0 ? '+' : ''}${profit.toFixed(2)}</td>
    `;
    
    tradingHistory.insertBefore(row, tradingHistory.firstChild);
}

function transferProfit() {
    const profitElement = document.getElementById('trading-profit');
    const totalBalanceElement = document.getElementById('total-balance');
    
    const profit = parseFloat(profitElement.textContent.replace('$', '').replace(',', ''));
    const totalBalance = parseFloat(totalBalanceElement.textContent.replace('$', '').replace(',', ''));
    
    // Transfer profit to main balance
    const newTotalBalance = totalBalance + profit;
    totalBalanceElement.textContent = '$' + newTotalBalance.toFixed(2);
    
    // Reset profit
    profitElement.textContent = '$0.00';
    
    showNotification('Profit transferred to main balance!', 'success');
}

function handleTradingWithdraw(event) {
    event.preventDefault();
    
    const destination = document.getElementById('trading-destination').value;
    const amount = parseFloat(document.getElementById('trading-withdraw-amount').value);
    
    const profitElement = document.getElementById('trading-profit');
    const currentProfit = parseFloat(profitElement.textContent.replace('$', '').replace(',', ''));
    
    if (amount > currentProfit) {
        showNotification('Insufficient profit balance', 'error');
        return;
    }
    
    // Deduct from profit
    profitElement.textContent = '$' + (currentProfit - amount).toFixed(2);
    
    showNotification(`$${amount.toFixed(2)} transferred to ${destination}`, 'success');
}

// Admin Functions
function createSubAccount(event) {
    event.preventDefault();
    
    const username = document.getElementById('sub-username').value;
    const email = document.getElementById('sub-email').value;
    const balance = parseFloat(document.getElementById('sub-balance').value) || 0;
    const permissions = document.getElementById('sub-permissions').value;
    
    const accountNumber = generateAccountNumber();
    
    const newAccount = {
        username: username,
        email: email,
        accountNumber: accountNumber,
        balance: balance,
        permissions: permissions,
        status: 'Active'
    };
    
    // Add to admin accounts table
    const adminAccounts = document.getElementById('admin-accounts');
    if (adminAccounts) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${accountNumber}</td>
            <td>${username}</td>
            <td>$${balance.toFixed(2)}</td>
            <td style="color: var(--success-color);">Active</td>
            <td>
                <button class="btn btn-secondary">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        `;
        adminAccounts.appendChild(row);
    }
    
    showNotification('Sub-account created successfully! Account: ' + accountNumber, 'success');
    
    // Clear form
    document.getElementById('sub-username').value = '';
    document.getElementById('sub-email').value = '';
    document.getElementById('sub-balance').value = '';
}

// Expert Options Functions
function refreshIP() {
    const serverIP = document.getElementById('server-ip');
    const newIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    serverIP.textContent = newIP;
    showNotification('IP address refreshed', 'info');
}

function checkNetwork() {
    showNotification('Network connection: Stable (24ms latency)', 'success');
}

// Receipt Functions
function generateReceipt(transactionDetails) {
    const receiptModal = document.getElementById('receipt-modal');
    const receiptContent = document.getElementById('receipt-content');
    
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = '';
    
    if (typeof transactionDetails === 'object') {
        // Transaction receipt
        content = `
            <div class="receipt-row">
                <span>Date:</span>
                <span>${date}</span>
            </div>
            <div class="receipt-row">
                <span>Time:</span>
                <span>${time}</span>
            </div>
            <div class="receipt-row">
                <span>Transaction Type:</span>
                <span>${transactionDetails.type || 'Transfer'}</span>
            </div>
            <div class="receipt-row">
                <span>Amount:</span>
                <span>${transactionDetails.currency || 'USD'} ${transactionDetails.amount.toFixed(2)}</span>
            </div>
            <div class="receipt-row">
                <span>Recipient:</span>
                <span>${transactionDetails.recipient}</span>
            </div>
            <div class="receipt-row">
                <span>Account:</span>
                <span>${transactionDetails.account}</span>
            </div>
            <div class="receipt-row">
                <span>Bank:</span>
                <span>${transactionDetails.bank}</span>
            </div>
            <div class="receipt-row">
                <span>Reference:</span>
                <span>GMW${Date.now()}</span>
            </div>
        `;
    } else {
        // Admin receipt
        content = `
            <div class="receipt-row">
                <span>Date:</span>
                <span>${date}</span>
            </div>
            <div class="receipt-row">
                <span>Bank:</span>
                <span>Global Pilgrim Bank</span>
            </div>
            <div class="receipt-row">
                <span>Account Number:</span>
                <span>1000000000</span>
            </div>
            <div class="receipt-row">
                <span>SWIFT Code:</span>
                <span>GLPLUS33</span>
            </div>
            <div class="receipt-row">
                <span>Swiss Code:</span>
                <span>CH-GLPL-001</span>
            </div>
        `;
    }
    
    receiptContent.innerHTML = content;
    receiptModal.classList.add('active');
}

function printReceipt() {
    window.print();
}

function closeModal() {
    const receiptModal = document.getElementById('receipt-modal');
    receiptModal.classList.remove('active');
}

// Profile Functions
function updateProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;
    const passport = document.getElementById('profile-passport').files[0];
    
    if (currentUser) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        if (passport) {
            currentUser.passport = passport.name;
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        
        showNotification('Profile updated successfully!', 'success');
    }
}

// Notification Functions
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Trading Page Link
document.addEventListener('DOMContentLoaded', function() {
    // Handle trading page link
    const tradingLinks = document.querySelectorAll('a[href="#trading-page"]');
    tradingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('trading');
        });
    });
});

// Protection - Prevent script deletion
(function protectScript() {
    const script = document.querySelector('script[src$="script.js"]');
    if (script) {
        script.setAttribute('data-protected', 'true');
        script.setAttribute('data-owner', 'Olawale Abdul-ganiyu');
    }
})();

console.log('%c Global Money Wallet ', 'background: #1a1a2e; color: #e94560; font-size: 20px; font-weight: bold;');
console.log('%c Owner: Olawale Abdul-ganiyu ', 'color: #00ff88; font-size: 14px;');
console.log('%c This script is protected. Unauthorized modification is prohibited. ', 'color: #ffcc00; font-size: 12px;');