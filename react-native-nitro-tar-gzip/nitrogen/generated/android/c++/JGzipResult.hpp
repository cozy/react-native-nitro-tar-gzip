///
/// JGzipResult.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include "GzipResult.hpp"

#include <optional>
#include <string>

namespace margelo::nitro::nitrogzip {

  using namespace facebook;

  /**
   * The C++ JNI bridge between the C++ struct "GzipResult" and the the Kotlin data class "GzipResult".
   */
  struct JGzipResult final: public jni::JavaClass<JGzipResult> {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/nitrogzip/GzipResult;";

  public:
    /**
     * Convert this Java/Kotlin-based struct to the C++ struct GzipResult by copying all values to C++.
     */
    [[maybe_unused]]
    [[nodiscard]]
    GzipResult toCpp() const {
      static const auto clazz = javaClassStatic();
      static const auto fieldSuccess = clazz->getField<jboolean>("success");
      jboolean success = this->getFieldValue(fieldSuccess);
      static const auto fieldPath = clazz->getField<jni::JString>("path");
      jni::local_ref<jni::JString> path = this->getFieldValue(fieldPath);
      static const auto fieldError = clazz->getField<jni::JString>("error");
      jni::local_ref<jni::JString> error = this->getFieldValue(fieldError);
      return GzipResult(
        static_cast<bool>(success),
        path != nullptr ? std::make_optional(path->toStdString()) : std::nullopt,
        error != nullptr ? std::make_optional(error->toStdString()) : std::nullopt
      );
    }

  public:
    /**
     * Create a Java/Kotlin-based struct by copying all values from the given C++ struct to Java.
     */
    [[maybe_unused]]
    static jni::local_ref<JGzipResult::javaobject> fromCpp(const GzipResult& value) {
      return newInstance(
        value.success,
        value.path.has_value() ? jni::make_jstring(value.path.value()) : nullptr,
        value.error.has_value() ? jni::make_jstring(value.error.value()) : nullptr
      );
    }
  };

} // namespace margelo::nitro::nitrogzip
