export function ReviewForm() {
    return (
        <form className="mt-10 space-y-4 max-w-xl">
            <h2 className="text-xl font-semibold">Leave a Review</h2>
            <input
                className="w-full rounded bg-neutral-900 border border-neutral-800 p-3" placeholder="Your name"
            />

            <input
                className="w-full rounded bg-neutral-900 border border-neutral-800 p-3"
                placeholder="Review title"
            />

            <textarea
                rows={5}
                className="w-full rounded bg-neutral-900 border border-neutral-800 p-3"
                placeholder="Write your review (Markdown supported)"
            />

            <select className="w-full rounded bg-neutral-900 border border-neutral-800 p-3">
                <option value="">Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                        {r} Star{r > 1 && "s"}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="rounded bg-red-600 px-6 py-3 font-medium hover:bg-red-700 transition"
            >
                Submit Review
            </button>
        </form>
    );
}
