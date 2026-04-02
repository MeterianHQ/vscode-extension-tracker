# Notifications & Snoozing

Meterian Security is designed to be informative without being noisy. You have full control over when and how often it interrupts you.

## Notification frequency

By default the extension shows results every time it runs. You can change this in Settings under **Notifications**:

| Option | Behaviour |
|--------|-----------|
| Always | Show results on every scan (default) |
| Once per session | Show once per IDE session, then stay quiet |
| Daily | Show at most once per day |
| Weekly | Show at most once per week |
| Monthly | Show at most once per month |
| Once | Show results once |

Once results have been viewed, they will be hidden. They will be shown again based on the frequency chosen above. 
The only exceptions to this rule are:

- On-deman analysis request: if you trigger an on-demand analysis, after it completes all problems will be shown (old and new ones if any)
- New problems are discovered: as security analyses continue running in the background, if new problems are discovered then all outstanding problems are shown

## Snoozing a single finding

To suppress a specific vulnerability without fixing it:

1. Open the **Quick Fix** menu on the affected line (lightbulb or `Ctrl+.`)
2. Select **Snooze this issue**
3. Choose a duration

The finding is hidden for the chosen period. When the snooze expires, it reappears automatically.

## Snoozing an entire manifest file

To silence all findings for a specific file (e.g. while you're mid-refactor):

1. Right-click the manifest file in the **Explorer panel**
2. Select **Snooze Meterian notifications for this file**
3. Choose a duration

To undo: right-click the file again and select **Unsnooze**.

## "New vulnerabilities only" mode

In addition to snoozing, you can configure the extension to only alert you when **new** findings appear — ones that weren't present in the previous scan. Previously seen issues are tracked silently until they change.

This is the recommended setting for projects with a known baseline of vulnerabilities you're working through gradually.

Configure via: `Settings → Meterian Security → Notifications → Problems only`
