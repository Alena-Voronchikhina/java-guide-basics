# Java Hard Constraints (Enforced)

This document lists non-negotiable constraints enforced by modern Java.

These rules are imposed by `javac`, the JVM, or the classloader and cannot be
bypassed by style guides, frameworks, or build tools.

If design conflicts with this document, the design must change.

## 1. Source and Compilation

- Exactly one `public` top-level class per `.java` file.
- Public class name must exactly match filename.
  - `public class Foo` -> `Foo.java`
- Curly braces `{}` define blocks.
- Statements end with semicolons `;`.
- Identifiers are case-sensitive.
- Java is statically typed.
  - `var` does compile-time inference only.

## 2. Type System and JVM Rules

### Primitive Types (Fixed Sizes)

| Type | Size |
| --- | --- |
| byte | 8-bit |
| short | 16-bit |
| int | 32-bit |
| long | 64-bit |
| char | 16-bit (UTF-16 code unit) |
| float | 32-bit (IEEE 754) |
| double | 64-bit (IEEE 754) |

- No unsigned primitives except `char`.
- Primitive sizes are platform-independent.

## 3. Object Model

- All objects are heap-allocated.
- Object variables store references, not values.
- Objects are passed by reference-value copy.
- No pointer arithmetic.
- No user-visible stack allocation for objects.

## 4. Packages and Class Loading

- Package declarations map to directory structure.
  - `package a.b.c;` -> `a/b/c/`
- Classpath-based resolution uses ordered lookup.
- Class shadowing is possible and order-dependent.
- Reverse-domain package naming is ecosystem convention.

## 5. Program Entry and Execution

- Standard entry point:

```java
public static void main(String[] args)
```

- JVM-controlled startup sequence.
- `String` is UTF-16 indexed (`char` is not a Unicode code point).

## 6. Runtime and JVM Guarantees

- Garbage collection is mandatory.
- No deterministic object destruction (no RAII).
- Use `try-with-resources` for resource cleanup.
- Checked exceptions are enforced by the type system.
- Exception hierarchy is fixed:

```text
Throwable
 |- Exception
 |- Error
```

- Backward bytecode compatibility is guaranteed.
- Stack-based JVM execution model is fixed.
- `System.out` and `System.err` are always present.
- JVM initializes standard I/O streams at startup.
- `finalize()` is effectively obsolete.

## Design Rule

If a feature conflicts with any rule above:

- Do not fight Java.
- Redesign the abstraction.
- Assume the constraint is permanent.

This document defines Java platform immutables.
