export default function About() {
    const string = process.env.GIT_TOKEN;
    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>This is about page using app router! {string}</p>
        </div>
    );
}