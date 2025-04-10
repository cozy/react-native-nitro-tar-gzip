echo "Starting the release process..."
echo "Provided options: $@"

echo "Publishing react-native-nitro-tar-gzip to NPM"
cd package
yarn release $@

echo "Creating a Git bump commit and GitHub release"
cd ..
yarn run release-it $@

echo "Successfully released react-native-nitro-tar-gzip!"
