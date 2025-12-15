<!DOCTYPE html>
<html>
<head>
    <title>Welcome to UAS</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h1 style="color: #4f46e5;">Welcome, {{ $user->name }}!</h1>
        <p>Thank you for registering with the University Accounting System (UAS).</p>
        <p>Your account has been successfully created.</p>
        
        <p><strong>Account Details:</strong></p>
        <ul>
            <li>Username: {{ $user->username }}</li>
            <li>Role: {{ ucfirst($user->role) }}</li>
        </ul>

        <p>You can now log in and access your dashboard.</p>
        
        <p style="margin-top: 30px; font-size: 0.9em; color: #777;">
            Best regards,<br>
            The UAS Team
        </p>
    </div>
</body>
</html>
