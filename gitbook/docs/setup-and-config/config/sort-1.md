# ResumeOnRestart



## `agenda.resumeOnRestart(resume)`

{% hint style="info" %}
The `resumeOnRestart` method sets a flag to ensure that jobs are resumed if the system restarts. This is particularly important for resuming unfinished jobs that were in progress or awaiting execution prior to the restart.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();

agenda.resumeOnRestart(true) // or agenda.resumeOnRestart()

//or new Agenda({ resumeOnRestart: true });
```



### Parameters

* **`resume`** (`boolean` - optional): If `true`, enables resuming unfinished jobs after restart. Defaults to `true`.

### Returns

* **`Agenda`**: Returns the instance of the `Agenda` class, enabling method chaining.



