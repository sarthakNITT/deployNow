export default function Account () {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <input
                type="text"
                value={accountData.name}
                onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                className="input-sm w-full"
                />
            </div>
            <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input
                type="email"
                value={accountData.email}
                onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                className="input-sm w-full"
                />
            </div>
            <div>
                <label className="block text-xs font-medium mb-1">Avatar URL</label>
                <input
                type="url"
                value={accountData.avatar}
                onChange={(e) => setAccountData({ ...accountData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="input-sm w-full"
                />
            </div>
            </div>
        </div>
    )
}