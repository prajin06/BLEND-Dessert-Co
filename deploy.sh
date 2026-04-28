#!/bin/bash
set -e

echo "========================================="
echo "  Deploying BLEND Dessert & Co to K8s"
echo "========================================="

echo "[1/3] Applying Kubernetes manifests..."
kubectl apply -f k8s/

echo "[2/3] Restarting deployment to pull latest image..."
kubectl rollout restart deployment/blend-app

echo "[3/3] Waiting for rollout to complete..."
kubectl rollout status deployment/blend-app --timeout=120s

echo ""
echo "Deployment complete!"
kubectl get pods -l app=blend-app
kubectl get services blend-service
