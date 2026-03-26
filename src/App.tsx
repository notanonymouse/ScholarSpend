```App.tsx
import React, { useState } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Social } from './pages/Social'
import { Settings } from './pages/Settings'
import { Notifications } from './pages/Notifications'
import { AccountSettings } from './pages/AccountSettings'
import { LinkedAccounts } from './pages/LinkedAccounts'
import { BudgetCategories } from './pages/BudgetCategories'
import { PrivacySecurity } from './pages/PrivacySecurity'
import { HelpCenter } from './pages/HelpCenter'
import { ContactSupport } from './pages/ContactSupport'
import { LogoutSplash } from './pages/LogoutSplash'
import { BottomNav } from './components/BottomNav'
import { ScanReceiptModal } from './components/ScanReceiptModal'
import { MoveFundsModal } from './components/MoveFundsModal'
import { BalanceDetailsModal } from './components/BalanceDetailsModal'
import { QuestDetailsModal } from './components/QuestDetailsModal'
import { CreateStudyGroupModal } from './components/CreateStudyGroupModal'
import { ManualEntryModal } from './components/ManualEntryModal'
import { TransactionHistoryModal } from './components/TransactionHistoryModal'
type Page =
  | 'home'
  | 'social'
  | 'settings'
  | 'linkedAccounts'
  | 'budgetCategories'
  | 'privacySecurity'
  | 'helpCenter'
  | 'contactSupport'
interface StudyGroup {
  id: number
  name: string
  goal: string
  targetAmount: string
  currentAmount: number
  members: number
}
export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const [showScanReceipt, setShowScanReceipt] = useState(false)
  const [showMoveFunds, setShowMoveFunds] = useState(false)
  const [showBalanceDetails, setShowBalanceDetails] = useState(false)
  const [showQuestDetails, setShowQuestDetails] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [showLogoutSplash, setShowLogoutSplash] = useState(false)
  // Study Groups State - persists across the app
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: 1,
      name: 'CS Study Squad',
      goal: 'Spring Break Trip',
      targetAmount: '2000',
      currentAmount: 1600,
      members: 5,
    },
  ])
  const handleMoveFundsConfirm = () => {
    console.log('Funds transferred to Spring Break goal')
  }
  const handleCreateGroup = (groupData: {
    name: string
    goal: string
    targetAmount: string
  }) => {
    const newGroup: StudyGroup = {
      id: Date.now(),
      name: groupData.name,
      goal: groupData.goal,
      targetAmount: groupData.targetAmount,
      currentAmount: 0,
      members: 1,
    }
    setStudyGroups([...studyGroups, newGroup])
    console.log('Study group created:', newGroup)
  }
  const handleManualEntry = (entryData: {
    amount: string
    category: string
    merchant: string
    date: string
    notes: string
  }) => {
    console.log('Transaction added:', entryData)
  }
  const handleNotificationAction = (notificationId: number, action: string) => {
    console.log('Notification action:', notificationId, action)
  }
  return (
    <>
      {currentPage === 'home' && (
        <Dashboard
          onNotifications={() => setShowNotifications(true)}
          onProfile={() => setShowAccountSettings(true)}
          onBalanceDetails={() => setShowBalanceDetails(true)}
          onMoveFunds={() => setShowMoveFunds(true)}
          onQuestDetails={() => setShowQuestDetails(true)}
          onViewAllGroups={() => setShowCreateGroup(true)}
          studyGroups={studyGroups}
        />
      )}
      {currentPage === 'social' && (
        <Social onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'settings' && (
        <Settings
          onBack={() => setCurrentPage('home')}
          onAccountSettings={() => setShowAccountSettings(true)}
          onLinkedAccounts={() => setCurrentPage('linkedAccounts')}
          onBudgetCategories={() => setCurrentPage('budgetCategories')}
          onPrivacySecurity={() => setCurrentPage('privacySecurity')}
          onHelpCenter={() => setCurrentPage('helpCenter')}
          onContactSupport={() => setCurrentPage('contactSupport')}
          onLogout={() => setShowLogoutSplash(true)}
        />
      )}
      {currentPage === 'linkedAccounts' && (
        <LinkedAccounts onBack={() => setCurrentPage('settings')} />
      )}
      {currentPage === 'budgetCategories' && (
        <BudgetCategories onBack={() => setCurrentPage('settings')} />
      )}
      {currentPage === 'privacySecurity' && (
        <PrivacySecurity onBack={() => setCurrentPage('settings')} />
      )}
      {currentPage === 'helpCenter' && (
        <HelpCenter onBack={() => setCurrentPage('settings')} />
      )}
      {currentPage === 'contactSupport' && (
        <ContactSupport onBack={() => setCurrentPage('settings')} />
      )}

      <BottomNav
        activePage={currentPage}
        onNavigate={setCurrentPage}
        onScanReceipt={() => setShowScanReceipt(true)}
      />

      {showNotifications && (
        <Notifications
          onClose={() => setShowNotifications(false)}
          onNotificationAction={handleNotificationAction}
        />
      )}
      {showAccountSettings && (
        <AccountSettings onClose={() => setShowAccountSettings(false)} />
      )}
      {showScanReceipt && (
        <ScanReceiptModal
          onClose={() => setShowScanReceipt(false)}
          onManualEntry={() => setShowManualEntry(true)}
        />
      )}
      {showMoveFunds && (
        <MoveFundsModal
          onClose={() => setShowMoveFunds(false)}
          onConfirm={handleMoveFundsConfirm}
        />
      )}
      {showBalanceDetails && (
        <BalanceDetailsModal onClose={() => setShowBalanceDetails(false)} />
      )}
      {showQuestDetails && (
        <QuestDetailsModal onClose={() => setShowQuestDetails(false)} />
      )}
      {showCreateGroup && (
        <CreateStudyGroupModal
          onClose={() => setShowCreateGroup(false)}
          onCreate={handleCreateGroup}
        />
      )}
      {showManualEntry && (
        <ManualEntryModal
          onClose={() => setShowManualEntry(false)}
          onSubmit={handleManualEntry}
        />
      )}
      {showTransactionHistory && (
        <TransactionHistoryModal
          onClose={() => setShowTransactionHistory(false)}
        />
      )}
      {showLogoutSplash && (
        <LogoutSplash
          onComplete={() => {
            setShowLogoutSplash(false)
            setCurrentPage('home')
          }}
        />
      )}
    </>
  )
}

```
```components/BalanceCard.tsx
import React from 'react'
import { TrendingUp } from 'lucide-react'
interface BalanceCardProps {
  onViewDetails: () => void
}
export function BalanceCard({ onViewDetails }: BalanceCardProps) {
  return (
    <button
      onClick={onViewDetails}
      className="w-full bg-blue-600 rounded-[24px] p-6 shadow-lg shadow-blue-600/20 text-white relative overflow-hidden hover:shadow-xl hover:shadow-blue-600/30 transition-all active:scale-[0.98] text-left"
    >
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-emerald-400/20 blur-xl"></div>

      <div className="relative z-10">
        <p className="text-blue-100 text-sm font-medium mb-1">
          Available to Spend
        </p>
        <h2 className="text-4xl font-bold tracking-tight mb-6">$1,234.50</h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between border border-white/10">
          <div>
            <p className="text-blue-100 text-xs font-medium mb-0.5">
              Safe-to-Save
            </p>
            <p className="text-xl font-semibold text-emerald-300">$456.00</p>
          </div>
          <div className="bg-emerald-400/20 p-2 rounded-full">
            <TrendingUp className="w-5 h-5 text-emerald-300" />
          </div>
        </div>
      </div>
    </button>
  )
}

```
```components/BalanceDetailsModal.tsx
import React from 'react'
import { X, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
interface BalanceDetailsModalProps {
  onClose: () => void
}
export function BalanceDetailsModal({ onClose }: BalanceDetailsModalProps) {
  const transactions = [
    {
      id: 1,
      name: 'Dining Hall',
      amount: -12.5,
      category: 'Food',
      date: 'Today',
      type: 'expense',
    },
    {
      id: 2,
      name: 'Part-time Job',
      amount: 150.0,
      category: 'Income',
      date: 'Yesterday',
      type: 'income',
    },
    {
      id: 3,
      name: 'Coffee Shop',
      amount: -5.75,
      category: 'Food',
      date: 'Yesterday',
      type: 'expense',
    },
    {
      id: 4,
      name: 'Textbook Refund',
      amount: 80.0,
      category: 'Savings',
      date: '2 days ago',
      type: 'income',
    },
  ]
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Balance Details</h2>
              <p className="text-blue-100 text-sm">Your spending breakdown</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-blue-100 text-xs font-medium mb-1">
                This Week
              </p>
              <p className="text-2xl font-bold">$234.50</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-blue-100 text-xs font-medium mb-1">
                This Month
              </p>
              <p className="text-2xl font-bold">$1,234.50</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-220px)] px-6 py-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            Recent Transactions
          </h3>

          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
            >
              <div
                className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'}`}
              >
                {transaction.type === 'income' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{transaction.name}</p>
                <p className="text-xs text-gray-500">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
              <p
                className={`font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}
              >
                {transaction.type === 'income' ? '+' : '-'}$
                {Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

```
```components/BottomNav.tsx
import React from 'react'
import { Home, Plus, Users, Settings } from 'lucide-react'
interface BottomNavProps {
  activePage: string
  onNavigate: (page: 'home' | 'social' | 'settings') => void
  onScanReceipt: () => void
}
export function BottomNav({
  activePage,
  onNavigate,
  onScanReceipt,
}: BottomNavProps) {
  // Determine which main section is active (settings pages should highlight settings)
  const isHomeActive = activePage === 'home'
  const isSocialActive = activePage === 'social'
  const isSettingsActive =
    activePage === 'settings' ||
    activePage === 'linkedAccounts' ||
    activePage === 'budgetCategories' ||
    activePage === 'privacySecurity' ||
    activePage === 'helpCenter' ||
    activePage === 'contactSupport'
  return (
    <div className="fixed bottom-6 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
      <nav className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[28px] px-6 py-3 flex items-center justify-between w-full max-w-[380px] pointer-events-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`p-2 flex flex-col items-center gap-1 transition-colors ${isHomeActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="Dashboard"
        >
          <Home className="w-6 h-6" />
          <span
            className={`text-[10px] ${isHomeActive ? 'font-bold' : 'font-medium'}`}
          >
            Home
          </span>
        </button>

        <button
          onClick={() => onNavigate('social')}
          className={`p-2 flex flex-col items-center gap-1 transition-colors ${isSocialActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="Leaderboard"
        >
          <Users className="w-6 h-6" />
          <span
            className={`text-[10px] ${isSocialActive ? 'font-bold' : 'font-medium'}`}
          >
            Social
          </span>
        </button>

        {/* Prominent Scan Receipt Button */}
        <div className="relative -top-6">
          <button
            onClick={onScanReceipt}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
            aria-label="Scan Receipt"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>

        <button
          onClick={() => onNavigate('settings')}
          className={`p-2 flex flex-col items-center gap-1 transition-colors ${isSettingsActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
          <span
            className={`text-[10px] ${isSettingsActive ? 'font-bold' : 'font-medium'}`}
          >
            Settings
          </span>
        </button>
      </nav>
    </div>
  )
}

```
```components/CreateStudyGroupModal.tsx
import React, { useState } from 'react'
import { X, Users, Target, DollarSign } from 'lucide-react'
interface CreateStudyGroupModalProps {
  onClose: () => void
  onCreate: (groupData: {
    name: string
    goal: string
    targetAmount: string
  }) => void
}
export function CreateStudyGroupModal({
  onClose,
  onCreate,
}: CreateStudyGroupModalProps) {
  const [groupName, setGroupName] = useState('')
  const [goal, setGoal] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const handleCreate = () => {
    if (groupName && goal && targetAmount) {
      onCreate({
        name: groupName,
        goal,
        targetAmount,
      })
      onClose()
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Create Study Group</h2>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 text-sm">
            Start saving together with friends
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <Users className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., CS Study Squad"
                className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Savings Goal
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <Target className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Spring Break Trip"
                className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g., 2000"
                className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900">
              💡 Invite friends after creating your group to start saving
              together!
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!groupName || !goal || !targetAmount}
            className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  )
}

```
```components/Header.tsx
import React from 'react'
import { Bell } from 'lucide-react'
interface HeaderProps {
  onNotifications: () => void
  onProfile: () => void
}
export function Header({ onNotifications, onProfile }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning!</h1>
        <p className="text-sm text-gray-500 font-medium">
          Ready to crush your goals?
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onNotifications}
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-gray-50 rounded-full"></span>
        </button>
        <button onClick={onProfile} aria-label="Profile">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </button>
      </div>
    </header>
  )
}

```
```components/ManualEntryModal.tsx
import React, { useState } from 'react'
import { X, DollarSign, Tag, Calendar, FileText } from 'lucide-react'
interface ManualEntryModalProps {
  onClose: () => void
  onSubmit: (entryData: {
    amount: string
    category: string
    merchant: string
    date: string
    notes: string
  }) => void
}
export function ManualEntryModal({ onClose, onSubmit }: ManualEntryModalProps) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [merchant, setMerchant] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const categories = [
    'Food',
    'Books',
    'Social',
    'Rent',
    'Transportation',
    'Other',
  ]
  const handleSubmit = () => {
    if (amount && merchant) {
      onSubmit({
        amount,
        category,
        merchant,
        date,
        notes,
      })
      onClose()
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Manual Entry</h2>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-emerald-100 text-sm">
            Add transaction details manually
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-180px)] px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merchant/Store *
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <FileText className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g., Campus Bookstore"
                className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <Tag className="w-5 h-5 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional details..."
              rows={3}
              className="w-full bg-gray-50 rounded-2xl p-4 text-gray-900 outline-none placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!amount || !merchant}
            className="flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  )
}

```
```components/MoveFundsModal.tsx
import React from 'react'
import { X, ArrowRight, Target } from 'lucide-react'
interface MoveFundsModalProps {
  onClose: () => void
  onConfirm: () => void
}
export function MoveFundsModal({ onClose, onConfirm }: MoveFundsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">Move Funds</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-gray-500">Confirm your savings transfer</p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Transfer Visual */}
          <div className="flex items-center justify-between">
            <div className="flex-1 bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-blue-600 font-medium mb-1">From</p>
              <p className="text-lg font-bold text-gray-900">Available</p>
              <p className="text-2xl font-bold text-blue-600">$80.00</p>
            </div>
            <div className="px-4">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1 bg-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-emerald-600 font-medium mb-1">To</p>
              <p className="text-lg font-bold text-gray-900">Spring Break</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Target className="w-4 h-4 text-emerald-600" />
                <p className="text-sm font-medium text-emerald-600">Goal</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Source</span>
              <span className="font-medium text-gray-900">
                Python Textbook Savings
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-gray-900">$80.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">New Goal Progress</span>
              <span className="font-bold text-emerald-600">85%</span>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900">
              💡 This will move $80 from your available balance to your Spring
              Break savings goal.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-emerald-700 transition-colors"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  )
}

```
```components/QuestDetailsModal.tsx
import React from 'react'
import { X, Trophy, Target, Star, Gift } from 'lucide-react'
interface QuestDetailsModalProps {
  onClose: () => void
}
export function QuestDetailsModal({ onClose }: QuestDetailsModalProps) {
  const quests = [
    {
      id: 1,
      name: 'Save $50 this week',
      progress: 80,
      reward: '50 XP',
      completed: false,
    },
    {
      id: 2,
      name: 'Track 5 receipts',
      progress: 100,
      reward: '25 XP',
      completed: true,
    },
    {
      id: 3,
      name: 'Stay under budget',
      progress: 60,
      reward: '100 XP',
      completed: false,
    },
  ]
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Quest Progress</h2>
              <p className="text-amber-100 text-sm">Level 3: Budget Master</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Level Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-amber-100">
                750 / 1000 XP
              </span>
              <span className="text-sm font-bold text-white">75%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: '75%',
                }}
              ></div>
            </div>
            <p className="text-xs text-amber-100 mt-2">250 XP to Level 4</p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-220px)] px-6 py-6 space-y-6">
          {/* Active Quests */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Active Quests
            </h3>
            <div className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border-2 ${quest.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${quest.completed ? 'bg-emerald-100' : 'bg-gray-200'}`}
                    >
                      {quest.completed ? (
                        <Star className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Target className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">
                        {quest.name}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${quest.completed ? 'bg-emerald-500' : 'bg-blue-600'}`}
                            style={{
                              width: `${quest.progress}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-600">
                          {quest.progress}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-medium text-gray-600">
                          {quest.reward}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">Next Reward</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Unlock "Financial Guru" badge at Level 4
            </p>
            <p className="text-xs text-gray-500">+ $10 bonus to savings goal</p>
          </div>
        </div>
      </div>
    </div>
  )
}

```
```components/QuestProgress.tsx
import React from 'react'
import { Trophy } from 'lucide-react'
interface QuestProgressProps {
  onViewDetails: () => void
}
export function QuestProgress({ onViewDetails }: QuestProgressProps) {
  const progress = 75
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  return (
    <button
      onClick={onViewDetails}
      className="w-full bg-white rounded-[24px] p-6 shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center gap-5 hover:shadow-xl transition-all active:scale-[0.98] text-left"
    >
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Progress Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-blue-600 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-amber-400" />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-gray-900">
            Level 3: Budget Master
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">250 XP to Level 4</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {progress}% Complete
          </span>
        </div>
      </div>
    </button>
  )
}

```
```components/ScanReceiptModal.tsx
import React, { useRef } from 'react'
import { X, Camera, Upload, FileText } from 'lucide-react'
interface ScanReceiptModalProps {
  onClose: () => void
  onManualEntry: () => void
}
export function ScanReceiptModal({
  onClose,
  onManualEntry,
}: ScanReceiptModalProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const handleCameraCapture = () => {
    cameraInputRef.current?.click()
  }
  const handleFileUpload = () => {
    uploadInputRef.current?.click()
  }
  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
      // Simulate processing
      setTimeout(() => {
        onClose()
        onManualEntry()
      }, 500)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Add Receipt</h2>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 text-sm">
            Track your spending automatically
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-4">
          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelected}
            className="hidden"
            aria-label="Camera capture"
          />
          <input
            ref={uploadInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelected}
            className="hidden"
            aria-label="File upload"
          />

          <button
            onClick={handleCameraCapture}
            className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-[24px] p-6 flex items-center gap-4 transition-colors"
          >
            <div className="bg-blue-600 p-3 rounded-full">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900">Take Photo</h3>
              <p className="text-sm text-gray-600">Scan receipt with camera</p>
            </div>
          </button>

          <button
            onClick={handleFileUpload}
            className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-[24px] p-6 flex items-center gap-4 transition-colors"
          >
            <div className="bg-gray-600 p-3 rounded-full">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900">Upload Image</h3>
              <p className="text-sm text-gray-600">Choose from gallery</p>
            </div>
          </button>

          <button
            onClick={() => {
              onClose()
              onManualEntry()
            }}
            className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-[24px] p-6 flex items-center gap-4 transition-colors"
          >
            <div className="bg-emerald-600 p-3 rounded-full">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900">Manual Entry</h3>
              <p className="text-sm text-gray-600">Type details manually</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-center text-xs text-gray-500">
            Your receipts are encrypted and stored securely
          </p>
        </div>
      </div>
    </div>
  )
}

```
```components/ScholarTip.tsx
import React from 'react'
import { Lightbulb } from 'lucide-react'
interface ScholarTipProps {
  onMoveFunds: () => void
}
export function ScholarTip({ onMoveFunds }: ScholarTipProps) {
  return (
    <div className="bg-emerald-50 rounded-[24px] p-5 shadow-sm border border-emerald-100 flex gap-4 items-start">
      <div className="bg-emerald-100 p-2.5 rounded-full flex-shrink-0 mt-0.5">
        <Lightbulb className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-emerald-900 mb-1">ScholarTip</h4>
        <p className="text-sm text-emerald-800 leading-relaxed">
          Switching to the digital textbook for your Python class saved you{' '}
          <span className="font-bold">$80</span> this month! Move it to your
          'Spring Break' goal?
        </p>
        <button
          onClick={onMoveFunds}
          className="mt-3 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Move Funds →
        </button>
      </div>
    </div>
  )
}

```
```components/StudyGroupGoals.tsx
import React from 'react'
import { Plus } from 'lucide-react'
interface StudyGroup {
  id: number
  name: string
  goal: string
  targetAmount: string
  currentAmount: number
  members: number
}
interface StudyGroupGoalsProps {
  onViewAll: () => void
  studyGroups: StudyGroup[]
}
export function StudyGroupGoals({
  onViewAll,
  studyGroups,
}: StudyGroupGoalsProps) {
  const friends = [
    {
      id: 1,
      name: 'Alex',
      img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
      id: 2,
      name: 'Sam',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    },
    {
      id: 3,
      name: 'Jordan',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    },
  ]
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-lg shadow-gray-200/50 border border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Study Group Goals</h3>
        <button
          onClick={onViewAll}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Create New
        </button>
      </div>

      {studyGroups.map((group) => {
        const percentage =
          (group.currentAmount / parseFloat(group.targetAmount)) * 100
        return (
          <div
            key={group.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
          >
            <div className="flex -space-x-3">
              {friends.slice(0, Math.min(3, group.members)).map((friend) => (
                <img
                  key={friend.id}
                  src={friend.img}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                />
              ))}
              {group.members > 3 && (
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                  +{group.members - 3}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-gray-900">{group.name}</span>
                <span className="text-xs text-gray-500">
                  {group.members} members
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">{group.goal}</span>
                <span className="font-bold text-gray-900">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ${group.currentAmount} / ${group.targetAmount}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

```
```components/TransactionHistoryModal.tsx
import React, { useState } from 'react'
import { X, TrendingUp, TrendingDown, Filter, Search } from 'lucide-react'
interface TransactionHistoryModalProps {
  onClose: () => void
}
export function TransactionHistoryModal({
  onClose,
}: TransactionHistoryModalProps) {
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const allTransactions = [
    {
      id: 1,
      name: 'Dining Hall',
      amount: -12.5,
      category: 'Food',
      date: 'Today',
      type: 'expense',
    },
    {
      id: 2,
      name: 'Part-time Job',
      amount: 150.0,
      category: 'Income',
      date: 'Yesterday',
      type: 'income',
    },
    {
      id: 3,
      name: 'Coffee Shop',
      amount: -5.75,
      category: 'Food',
      date: 'Yesterday',
      type: 'expense',
    },
    {
      id: 4,
      name: 'Textbook Refund',
      amount: 80.0,
      category: 'Savings',
      date: '2 days ago',
      type: 'income',
    },
    {
      id: 5,
      name: 'Campus Bookstore',
      amount: -45.0,
      category: 'Books',
      date: '3 days ago',
      type: 'expense',
    },
    {
      id: 6,
      name: 'Movie Night',
      amount: -15.0,
      category: 'Social',
      date: '4 days ago',
      type: 'expense',
    },
    {
      id: 7,
      name: 'Rent Payment',
      amount: -500.0,
      category: 'Rent',
      date: '5 days ago',
      type: 'expense',
    },
    {
      id: 8,
      name: 'Freelance Work',
      amount: 200.0,
      category: 'Income',
      date: '6 days ago',
      type: 'income',
    },
  ]
  const categories = [
    'All',
    'Food',
    'Books',
    'Social',
    'Rent',
    'Income',
    'Savings',
  ]
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesCategory =
      filterCategory === 'All' || transaction.category === filterCategory
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-white z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Transaction History</h2>
              <p className="text-blue-100 text-sm">
                All your spending & income
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
            <Search className="w-5 h-5 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-[180px] bg-white px-6 py-4 border-b border-gray-100 z-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="overflow-y-auto max-h-[calc(90vh-320px)] px-6 py-4 space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'}`}
                >
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{transaction.name}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
                <p
                  className={`font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-red-600 font-medium mb-1">
                Total Spent
              </p>
              <p className="text-lg font-bold text-red-700">$577.25</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-emerald-600 font-medium mb-1">
                Total Earned
              </p>
              <p className="text-lg font-bold text-emerald-700">$430.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

```
```components/WeeklyChart.tsx
import React from 'react'
export function WeeklyChart() {
  const categories = [
    {
      name: 'Rent',
      amount: 500,
      percentage: 80,
      color: 'bg-blue-600',
    },
    {
      name: 'Food',
      amount: 120,
      percentage: 45,
      color: 'bg-emerald-400',
    },
    {
      name: 'Books',
      amount: 80,
      percentage: 30,
      color: 'bg-indigo-400',
    },
    {
      name: 'Social',
      amount: 50,
      percentage: 20,
      color: 'bg-amber-400',
    },
  ]
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-5">Week at a Glance</h3>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center gap-3">
            <div className="w-14 text-sm font-medium text-gray-600">
              {category.name}
            </div>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${category.color}`}
                style={{
                  width: `${category.percentage}%`,
                }}
                role="progressbar"
                aria-valuenow={category.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <div className="w-12 text-right text-sm font-bold text-gray-900">
              ${category.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

```
```index.css
/* @import url() FONT IMPORTS MUST ALWAYS BE AT THE VERY TOP OF THIS FILE, ABOVE THE TAILWIND IMPORTS — DO NOT DELETE THIS COMMENT */

/* CRITICAL: THE FOLLOWING TAILWIND IMPORTS MUST NEVER BE DELETED OR REORDERED — DO NOT DELETE THIS COMMENT */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* END TAILWIND IMPORTS — ALL OTHER CSS MUST GO BELOW THIS LINE */

```
```index.tsx
import "./index.css";
import React from "react";
import { render } from "react-dom";
import { App } from "./App";

render(<App />, document.getElementById("root"));

```
```pages/AccountSettings.tsx
import React, { useRef } from 'react'
import { X, Camera, Mail, Phone, Calendar, MapPin } from 'lucide-react'
interface AccountSettingsProps {
  onClose: () => void
}
export function AccountSettings({ onClose }: AccountSettingsProps) {
  const photoInputRef = useRef<HTMLInputElement>(null)
  const handlePhotoClick = () => {
    photoInputRef.current?.click()
  }
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('Profile photo selected:', file.name)
      // In a real app, upload the photo here
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              aria-label="Upload profile photo"
            />
            <div className="relative">
              <button onClick={handlePhotoClick} className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </button>
              <button
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Change profile photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-lg">Sarah Johnson</h3>
              <p className="text-sm text-gray-500">@sarahj_scholar</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  defaultValue="sarah.johnson@university.edu"
                  className="flex-1 bg-transparent text-gray-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="flex-1 bg-transparent text-gray-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue="State University"
                  className="flex-1 bg-transparent text-gray-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year
              </label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue="2026"
                  className="flex-1 bg-transparent text-gray-900 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

```
```pages/BudgetCategories.tsx
import React from 'react'
import { ArrowLeft, Edit2 } from 'lucide-react'
interface BudgetCategoriesProps {
  onBack: () => void
}
export function BudgetCategories({ onBack }: BudgetCategoriesProps) {
  const categories = [
    {
      id: 1,
      name: 'Food',
      budget: 300,
      spent: 234,
      color: 'bg-emerald-400',
    },
    {
      id: 2,
      name: 'Rent',
      budget: 600,
      spent: 500,
      color: 'bg-blue-600',
    },
    {
      id: 3,
      name: 'Books',
      budget: 150,
      spent: 125,
      color: 'bg-indigo-400',
    },
    {
      id: 4,
      name: 'Social',
      budget: 100,
      spent: 67,
      color: 'bg-amber-400',
    },
    {
      id: 5,
      name: 'Transportation',
      budget: 80,
      spent: 45,
      color: 'bg-purple-400',
    },
    {
      id: 6,
      name: 'Other',
      budget: 120,
      spent: 89,
      color: 'bg-gray-400',
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Settings"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Budget Categories
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Manage your spending limits
            </p>
          </div>
        </header>

        {/* Total Budget Overview */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[24px] p-6 shadow-lg text-white">
          <p className="text-blue-100 text-sm font-medium mb-1">
            Total Monthly Budget
          </p>
          <h2 className="text-4xl font-bold mb-4">$1,350</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-100">Spent this month</span>
              <span className="font-bold">$1,060</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: '78%',
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category) => {
            const percentage = (category.spent / category.budget) * 100
            const isOverBudget = percentage > 100
            return (
              <div
                key={category.id}
                className="bg-white rounded-[24px] p-5 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${category.color}`}
                    ></div>
                    <h3 className="font-bold text-gray-900">{category.name}</h3>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    ${category.spent} / ${category.budget}
                  </span>
                  <span
                    className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isOverBudget ? 'bg-red-500' : category.color}`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

```
```pages/ContactSupport.tsx
import React, { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
interface ContactSupportProps {
  onBack: () => void
}
export function ContactSupport({ onBack }: ContactSupportProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = () => {
    if (subject && message) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setSubject('')
        setMessage('')
      }, 3000)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Settings"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Contact Support
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              We're here to help
            </p>
          </div>
        </header>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-[24px] p-8 text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Message Sent!
            </h2>
            <p className="text-sm text-gray-600">
              Our support team will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Form */}
            <div className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What do you need help with?"
                  className="w-full bg-gray-50 rounded-2xl p-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={6}
                  className="w-full bg-gray-50 rounded-2xl p-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!subject || !message}
              className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-[24px] hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>

            {/* Response Time */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-sm text-blue-900">
                ⏱️ Average response time: 4-6 hours
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

```
```pages/Dashboard.tsx
import React from 'react'
import { Header } from '../components/Header'
import { BalanceCard } from '../components/BalanceCard'
import { WeeklyChart } from '../components/WeeklyChart'
import { ScholarTip } from '../components/ScholarTip'
import { QuestProgress } from '../components/QuestProgress'
import { StudyGroupGoals } from '../components/StudyGroupGoals'
interface StudyGroup {
  id: number
  name: string
  goal: string
  targetAmount: string
  currentAmount: number
  members: number
}
interface DashboardProps {
  onNotifications: () => void
  onProfile: () => void
  onBalanceDetails: () => void
  onMoveFunds: () => void
  onQuestDetails: () => void
  onViewAllGroups: () => void
  studyGroups: StudyGroup[]
}
export function Dashboard({
  onNotifications,
  onProfile,
  onBalanceDetails,
  onMoveFunds,
  onQuestDetails,
  onViewAllGroups,
  studyGroups,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6 relative">
        <Header onNotifications={onNotifications} onProfile={onProfile} />
        <BalanceCard onViewDetails={onBalanceDetails} />
        <WeeklyChart />
        <ScholarTip onMoveFunds={onMoveFunds} />
        <QuestProgress onViewDetails={onQuestDetails} />
        <StudyGroupGoals
          onViewAll={onViewAllGroups}
          studyGroups={studyGroups}
        />
      </main>
    </div>
  )
}

```
```pages/HelpCenter.tsx
import React, { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
interface HelpCenterProps {
  onBack: () => void
}
export function HelpCenter({ onBack }: HelpCenterProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const faqs = [
    {
      id: 1,
      question: 'How do I link my bank account?',
      answer:
        'Go to Settings > Linked Accounts > Link New Account. Select your bank from the list and follow the secure authentication process. Your credentials are encrypted and never stored on our servers.',
    },
    {
      id: 2,
      question: 'How does the ScholarTip feature work?',
      answer:
        "ScholarTip uses AI to analyse your spending patterns and identify opportunities to save money. When we detect a potential saving (like switching to a digital textbook), we'll send you a notification, with the recommendation and estimated savings.",
    },
    {
      id: 3,
      question: 'What are Study Group Goals?',
      answer:
        "Study Group Goals let you save money together with friends towards a shared goal (like a spring break trip). Create a group, invite friends, and track your collective progress. Each member contributes individually, and you can see everyone's progress.",
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Settings"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
            <p className="text-sm text-gray-500 font-medium">
              Frequently asked questions
            </p>
          </div>
        </header>

        {/* FAQs */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id
            return (
              <div
                key={faq.id}
                className="bg-white rounded-[24px] shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still Need Help */}
        <div className="bg-blue-50 border border-blue-200 rounded-[24px] p-6">
          <h3 className="font-bold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Can't find what you're looking for? Contact our support team.
          </p>
          <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </main>
    </div>
  )
}

```
```pages/LinkedAccounts.tsx
import React from 'react'
import { ArrowLeft, Building2, CheckCircle, Plus } from 'lucide-react'
interface LinkedAccountsProps {
  onBack: () => void
}
export function LinkedAccounts({ onBack }: LinkedAccountsProps) {
  const accounts = [
    {
      id: 1,
      bank: 'Chase Bank',
      accountType: 'Checking',
      lastFour: '4532',
      balance: 1234.5,
      connected: true,
    },
    {
      id: 2,
      bank: 'Bank of America',
      accountType: 'Savings',
      lastFour: '7891',
      balance: 5678.0,
      connected: true,
    },
    {
      id: 3,
      bank: 'Wells Fargo',
      accountType: 'Credit Card',
      lastFour: '2345',
      balance: -234.5,
      connected: true,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Settings"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Linked Accounts
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Manage your connected banks
            </p>
          </div>
        </header>

        {/* Accounts List */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{account.bank}</h3>
                    {account.connected && (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {account.accountType} •••• {account.lastFour}
                  </p>
                  <p
                    className={`text-lg font-bold ${account.balance < 0 ? 'text-red-600' : 'text-gray-900'}`}
                  >
                    ${Math.abs(account.balance).toFixed(2)}
                  </p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Account Button */}
        <button className="w-full bg-blue-600 text-white rounded-[24px] p-6 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3">
          <Plus className="w-6 h-6" />
          <span className="font-bold">Link New Account</span>
        </button>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-900">
            🔒 Your banking data is encrypted with bank-level security and never
            stored on our servers.
          </p>
        </div>
      </main>
    </div>
  )
}

```
```pages/LogoutSplash.tsx
import React, { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
interface LogoutSplashProps {
  onComplete: () => void
}
export function LogoutSplash({ onComplete }: LogoutSplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center z-50">
      <div className="text-center text-white px-6">
        <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Successfully Logged Out</h1>
        <p className="text-blue-100">See you next time!</p>
      </div>
    </div>
  )
}

```
```pages/Notifications.tsx
import React, { useState } from 'react'
import { X, TrendingUp, Trophy, Users, Lightbulb } from 'lucide-react'
interface NotificationsProps {
  onClose: () => void
  onNotificationAction?: (notificationId: number, action: string) => void
}
export function Notifications({
  onClose,
  onNotificationAction,
}: NotificationsProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'tip',
      icon: Lightbulb,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      title: 'New ScholarTip Available',
      message: 'You could save $80 by switching to digital textbooks',
      time: '5m ago',
      unread: true,
    },
    {
      id: 2,
      type: 'achievement',
      icon: Trophy,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Level Up!',
      message: 'You reached Level 3: Budget Master',
      time: '2h ago',
      unread: true,
    },
    {
      id: 3,
      type: 'social',
      icon: Users,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Study Group Update',
      message: 'Your group is 80% toward Spring Break goal!',
      time: '1d ago',
      unread: true,
    },
    {
      id: 4,
      type: 'savings',
      icon: TrendingUp,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      title: 'Weekly Savings Report',
      message: 'You saved $120 this week - 15% above your goal!',
      time: '2d ago',
      unread: false,
    },
  ])
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        unread: false,
      })),
    )
  }
  const handleNotificationClick = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId
          ? {
              ...n,
              unread: false,
            }
          : n,
      ),
    )
    if (onNotificationAction) {
      onNotificationAction(notificationId, 'view')
    }
  }
  const unreadCount = notifications.filter((n) => n.unread).length
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-500">{unreadCount} unread</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4 space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={`w-full text-left p-4 rounded-2xl transition-colors ${notification.unread ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="flex gap-4">
                <div
                  className={`${notification.iconBg} p-2 rounded-full flex-shrink-0 h-fit`}
                >
                  <notification.icon
                    className={`w-5 h-5 ${notification.iconColor}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  )
}

```
```pages/PrivacySecurity.tsx
import React, { useState } from 'react'
import { ArrowLeft, Lock, Eye, EyeOff, Shield, Fingerprint } from 'lucide-react'
interface PrivacySecurityProps {
  onBack: () => void
}
export function PrivacySecurity({ onBack }: PrivacySecurityProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Settings"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Privacy & Security
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Protect your account
            </p>
          </div>
        </header>

        {/* Security Options */}
        <div className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
            Authentication
          </h3>

          {/* Biometric */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Fingerprint className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Biometric Login</p>
                <p className="text-xs text-gray-500">
                  Use fingerprint or Face ID
                </p>
              </div>
            </div>
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`w-12 h-7 rounded-full transition-colors ${biometricEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${biometricEnabled ? 'translate-x-6' : 'translate-x-1'}`}
              ></div>
            </button>
          </div>

          {/* Two-Factor */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Two-Factor Auth</p>
                <p className="text-xs text-gray-500">Extra security layer</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-12 h-7 rounded-full transition-colors ${twoFactorEnabled ? 'bg-emerald-600' : 'bg-gray-300'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`}
              ></div>
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
            Password
          </h3>
          <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <div className="bg-gray-200 p-2 rounded-full">
              <Lock className="w-5 h-5 text-gray-600" />
            </div>
            <span className="flex-1 font-medium text-gray-900 text-left">
              Change Password
            </span>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
            Privacy
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="bg-gray-200 p-2 rounded-full">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 font-medium text-gray-900 text-left">
                Data Sharing
              </span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="bg-gray-200 p-2 rounded-full">
                <EyeOff className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 font-medium text-gray-900 text-left">
                Delete My Data
              </span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

```
```pages/Settings.tsx
import React from 'react'
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  CreditCard,
  HelpCircle,
  LogOut,
} from 'lucide-react'
interface SettingsProps {
  onBack: () => void
  onAccountSettings: () => void
  onLinkedAccounts: () => void
  onBudgetCategories: () => void
  onPrivacySecurity: () => void
  onHelpCenter: () => void
  onContactSupport: () => void
  onLogout: () => void
}
export function Settings({
  onBack,
  onAccountSettings,
  onLinkedAccounts,
  onBudgetCategories,
  onPrivacySecurity,
  onHelpCenter,
  onContactSupport,
  onLogout,
}: SettingsProps) {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile Settings',
          onClick: onAccountSettings,
        },
        {
          icon: Bell,
          label: 'Notifications',
          badge: '3',
        },
        {
          icon: Lock,
          label: 'Privacy & Security',
          onClick: onPrivacySecurity,
        },
      ],
    },
    {
      title: 'Financial',
      items: [
        {
          icon: CreditCard,
          label: 'Linked Accounts',
          onClick: onLinkedAccounts,
        },
        {
          icon: CreditCard,
          label: 'Budget Categories',
          onClick: onBudgetCategories,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help Center',
          onClick: onHelpCenter,
        },
        {
          icon: HelpCircle,
          label: 'Contact Support',
          onClick: onContactSupport,
        },
      ],
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-y-auto">
      <main className="max-w-md mx-auto px-6 pt-8 pb-40 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 font-medium">
              Manage your preferences
            </p>
          </div>
        </header>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="bg-gray-100 p-2 rounded-full">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-gray-400">›</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-white rounded-[24px] p-6 shadow-lg border border-gray-100 flex items-center gap-4 hover:bg-red-50 transition-colors"
        >
          <div className="bg-red-100 p-2 rounded-full">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <span className="flex-1 font-bold text-red-600 text-left">
            Log Out
          </span>
        </button>

        {/* App Version */}
        <p className="text-center text-sm text-gray-400">ScholarSpend v1.0.0</p>
      </main>
    </div>
  )
}

```
```pages/Social.tsx
import React from 'react'
import { Trophy, TrendingUp, Users, ArrowLeft } from 'lucide-react'
interface SocialProps {
  onBack: () => void
}
export function Social({ onBack }: SocialProps) {
  const leaderboard = [
    {
      rank: 1,
      name: 'Alex Chen',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80',
      savings: 1250,
      streak: 12,
    },
    {
      rank: 2,
      name: 'You',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      savings: 1180,
      streak: 10,
      isCurrentUser: true,
    },
    {
      rank: 3,
      name: 'Sam Rivera',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      savings: 980,
      streak: 8,
    },
    {
      rank: 4,
      name: 'Jordan Lee',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      savings: 875,
      streak: 7,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Social</h1>
            <p className="text-sm text-gray-500 font-medium">
              Study group leaderboard
            </p>
          </div>
        </header>

        {/* Your Rank Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[24px] p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Trophy className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">Your Rank</p>
                <p className="text-3xl font-bold">#2</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm font-medium">Total Saved</p>
              <p className="text-2xl font-bold">$1,180</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <p className="text-sm text-white">
              10-day saving streak! Keep it up!
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            This Month's Leaders
          </h3>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${user.isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
                  <span
                    className={`text-sm font-bold ${user.rank === 1 ? 'text-yellow-500' : user.rank === 2 ? 'text-gray-400' : user.rank === 3 ? 'text-amber-600' : 'text-gray-500'}`}
                  >
                    {user.rank}
                  </span>
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.streak} day streak 🔥
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${user.savings}</p>
                  <p className="text-xs text-gray-500">saved</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Groups */}
        <div className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Study Groups</h3>
            <button className="text-sm font-bold text-blue-600">
              Create New
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">CS Study Squad</p>
                <p className="text-xs text-gray-500">
                  5 members • $2,450 saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

```
```tailwind.config.js
export default {}
```
