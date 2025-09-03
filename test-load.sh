#!/bin/bash
# test-load.sh

echo "Testing load balancer..."
for i in {1..10}; do
  response=$(curl -s http://localhost)
  echo "Request $i: $response"
  sleep 0.5
done