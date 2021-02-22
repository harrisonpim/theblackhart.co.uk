import Layout from "../components/layouts/default";

export default function Success() {
  return (
    <div>
      <Layout title="Success!" description="Thanks for your order!">
        <p>
          Thanks for your order! We'll be in touch with a confirmation soon.
        </p>
      </Layout>
    </div>
  );
}
